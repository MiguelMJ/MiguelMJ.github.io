---
layout: post
title: Writing a Conversational Interface Library - Adapted Regular Expressions
date: 2020-10-11
author: Miguel MJ
tags: ['\n  -regex', '\n  -java', '\n  -project', '\n  -log']
dev_url: https://dev.to/miguelmj/writing-a-conversational-interface-library-adapted-regular-expressions-6mn
---
The regular expressions that we will use in our library are mostly to process [controlled natural language](https://en.wikipedia.org/wiki/Controlled_natural_language), so we are going to make an adapted version of them. We will have to give up some of the potential of regular expressions to gain usability for the most common cases in our library.



_Note: We are going to use regular expressions to process regular expressions, so they can get a little confusing. You may want to check out my post on [Correctly escaping regular expressions](https://dev.to/miguelmj/correctly-escaping-regular-expressions-27nc/)_



## Features



The Adapted Expressions (this is how I will be calling this adapted version of regular expressions) have the following features and syntax:



- **Optional parts**: They will be enclosed between squared brackets `[]` and may be omitted. `one two[ three]` recognizes both `one two` and `one two three`.

- **Eligible parts**: They will be enclosed between parenthesis and separated by bars, and may be interchanged. `(one|two|three)` will recognize `one`, `two` or `three`

- **Word placeholder**: They are used to recognize one or more words and store them in the inner state. The syntax is `@>id[quant]` for `[quant]` words stored in a group named `id`. `[quant]` can be any of the usual quantifiers of regular expressions in Java: this is `*`,`+`, `{n}` or `{min,max}`. For example, `You can call me @>fullname{1,3}` will recognize `You can call me Jon Doe` or any other name with one word minimum and three maximum.

- **Number placeholder**: They are used to recognize one or more numbers and store them in the inner state. The syntax is `#>id[quant]`, with a similar behavior to the word placeholders.

- **Variables**: They are used to represent the content of a variable of the inner state. The syntax is `$id`.



_Note: Placeholders and variables refer to the same concepts explained in the last post_. 



Here's a table with the equivalences:



| Adapted Expression | Regular Expression |
|------------------|------------------|
| [text]             | (text)?            |
| (a&#124;b&#124;c)  | (a&#124;b&#124;c)  |
| @>id               | (?\<id>\w+ ?)      |
| @>id{n}            | (?\<id>(\w+ ?){n}) |
| #>id               | (?\<id>\d+ ?)      |
| #>id{n}            | (?\<id>(\d+ ?){n}) |
| $id                | $id                |


_Note: `$id` variables doesn't belong to Regular Expressions, but to the extension we made in the last post_.



## RegexAdapter class



In the previous we created this class to make a function to replace the variable names with the associated content in the inner state. Now we will add a new function to adapt the string of a Adapted Expression to a Regular Expression. It is very important to have clear that the reserved characters of the Adapted Expressions are not the same as in the Regular Expressions. For this reason, the first step of this transformation is to escape the characters with special meaning in a Regular Expression that are present in our Adapted Expression. This means that we have to assume that those characters are going to be escaped when we process them, and change that if necessary.



We are going to need the definition of certain constants. 





{% highlight java linenos %}
// The characters reserved in the Regular Expressions for which we don't want a
// special meaning
final static private char[] reserved = {'?', '^', '.', '$', '[', ']'};
// The strings used to  build the regex that contain common concepts in our expressions
final static private String id = "[a-zA-Z_]\\w*";
final static private String num = "\\d+";
final static private String print = "\\\\w+";
final static private String quant = "\\{\\d+,\\d*\\}|\\+|\\*";
// The regular expressions that we will use to make the transformation
final static private java.util.regex.Pattern optional_open
    = java.util.regex.Pattern.compile("\\\\\\[");
final static private java.util.regex.Pattern optional_close
    = java.util.regex.Pattern.compile("\\\\\\]");
final static private java.util.regex.Pattern alphaplaceholder 
    = java.util.regex.Pattern.compile("\\@>(?<id>"+id+")(?<quant>"+quant+")?");
final static private java.util.regex.Pattern numplaceholder 
    = java.util.regex.Pattern.compile("\\#>(?<id>"+id+")(?<quant>"+quant+")?");
final static public java.util.regex.Pattern variable 
    = java.util.regex.Pattern.compile("\\\\\\$(?<id>"+id+")");

{% endhighlight %}





With this constants defined, we can define the function to escape the Regular Expressions:





{% highlight java linenos %}
static private String quoteRegex(String regex){
    for(char ch: reserved){
        regex = regex.replaceAll("\\"+ch, Matcher.quoteReplacement("\\"+ch));
    }
    return regex;
}

{% endhighlight %}





And finally we can define the function to make the translation using replacing with backreferencing:





{% highlight java linenos %}
static public String adapt(String expr){
    Matcher matcher;
    matcher = optional_open.matcher(expr);
    expr = matcher.replaceAll("(");
    matcher = optional_close.matcher(expr);
    expr = matcher.replaceAll(")?");
    matcher = alphaplaceholder.matcher(expr);
    expr = matcher.replaceAll("(?<${id}>("+print+" ?)${quant})");
    matcher = numplaceholder.matcher(expr);
    expr = matcher.replaceAll("(?<${id}>("+num+" ?)${quant})");
    return expr;
}

{% endhighlight %}





#### Example



Now, instead of writing a response like this:





{% highlight json linenos %}
{
    "input": "Remind((er| me)? to)? (?<action>(\w ?)+) on (?<day>\w+)",
    "output": "I will you to $action on $day"
}

{% endhighlight %}





We can write it like this:





{% highlight java linenos %}
{
    "input": "Remind[[er| me] to] @>action+ on @>day",
    "output": "I will remind you to $action on $day"
}

{% endhighlight %}





## Conclusion and revision



Now we could add an option on each module or even each response that lets the user choose to either use a Regular Expression or an Adapted Expression, and use this function to transform these to those.



Since we had our first functional version, we have added_



- The possibility to read/write the inner state during the input matching and output generation.

- A simplified yet extensible version of the regular expressions for the user. 



This leaves us with the following issues:



- We still have to make a scoping system to control the modifications made during a match that was finally not successful.

- Add some options to the Pattern deserialization, to choose between Regular or Adapted expressions. 



As those are tweaks, more than essential features, I will document them in a post about the final tweaks to the library. For now, the next post will be about adding knowledge to our chatbots. We will add a feature to let the user to specify sets of words under concept categories.






