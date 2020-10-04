---
layout: post
title: Writing a Conversational Interface Library - Variables and Placeholders
date: 2020-10-04
author: Miguel MJ
tags: ['\n  -project', '\n  -log', '\n  -chatbot', '\n  -regex']
dev_url: https://dev.to/miguelmj/writing-a-conversational-interface-library-variables-and-placeholders-2el4
---
We already have a working chatbot engine, but as we saw in the example  of the last post, it's not very powerful. Now we are going to link the pattern matching and the inner state so we can make more specific checks on the user's input.



To do this we will have to make some preprocessing on the regular expressions we use, and even regenerate them several times during a session. **We will be making really heavy use of regular expressions**, so be prepared.



Note: In this post the word pattern can refer to different things, so before anything I want to make clear what it means depending on the format I use:



- Pattern, with capital P, refers to our custom class Pattern, that we defined in [Part 3](https://dev.to/miguelmj/writing-a-conversational-interface-library-part-3-55n4).

- java.util.regex.Pattern refers to the native class of Java.

- `pattern` refers to the java.util.regex.Pattern contained as an attribute in our custom Pattern class.



## Regex Named Capturing Groups in Java



Both for the preprocessing and for the inner state interaction, we need to handle this concept at least in a basic level. I won't dive much more than needed in it, so here we go.



In a `java.util.regex.Matcher`  you can capture a specific part of your string using a regular expression, and furthermore, name it. The syntax for it, inside the regex, is the following:





{% highlight none linenos %}
(?<name>subregex)

{% endhighlight %}





so the following code





{% highlight java linenos %}
String regex = "I am (?<age>[0-9]+) years old";
String str = "I am 23 years old"
Matcher m = java.util.regex.Pattern.compile(regex).matcher(str);
if(m.matches())
	System.out.println(m.group("age"));

{% endhighlight %}





will output:





{% highlight  linenos %}
23

{% endhighlight %}





#### Backreferencing



You can also use capturing groups in the replace function, to replace the content of the string recycling the very match. To do this, you must use `${identifier}` in the replace string: 





{% highlight java linenos %}
String regex = "I (?<word>[a-zA-Z]+)";
String str = "I write, I code, I learn";
Matcher m = java.util.regex.Pattern.compile(regex).matcher(str);
String result = m.repaceAll("We ${word}");
System.out.println(result);

{% endhighlight %}





This code outputs:





{% highlight  linenos %}
We write, We code, We learn

{% endhighlight %}





Now we are ready to face the new features of our library.



## Variables and placeholders



This is the way we will make use of these terms when talking of Patterns:



- **Variable**: They are read-only parts of the Pattern, that match/generate the correspondent value of the inner state. We will note them in our Patterns with a dollar sign: `$identifier` , where the identifier follows the lexical rules of the identifiers in C-families - Don't mistake this with the `${identifier}` I mentioned before, which works for the replace functions of the java `Matcher`, this is a construct of our own. **The need of Pattern regeneration comes from these**, because they change the strings recognized and generated.



  _Example_: If we had in our inner state a variable `flavour = coffee`, then the Pattern `I like $flavour` would only match/generate `I like coffee`.



- **Placeholder**: They are the parts of the pattern that store the matched value in the inner state. As you can imagine, we'll use the capturing groups for them.



  _Example_: If the CUI uses this response



  

{% highlight json linenos %}
  {
   "input":"my name is (?<name>[a-Az-Z])",
   "output":"hello $name!"
  }
  
{% endhighlight %}





  then the response to `my name is Miguel` will be `hello Miguel!`



## Implementation



The former implementation of Pattern we just had a `java.util.regex.Pattern pattern` and a `Generex generator`. Now, we may want to regenerate them before its use; let's see what are the conditions:



- For output generation, the _placeholders_ will be trated as _variables_ (their difference is only notable when matching input).

- This means that the `pattern` must be regenerated if the Pattern contains _variables_. The `generator`, furthermore, must be regenerated if the Pattern contains _variables_ or _placeholders_. 

- We need to add to our Pattern class the attributes `List<String> variables`, `List<String> placeholders`, `String inputTemplate` and `String outputTemplate`. **These last two will be used for regeneration**.



### Preprocessing the string to build a Pattern - I used the regex to preprocess the regex



Now, instead of building the `pattern` and the `generator` directly from the regex string (here we'll call it `str`), we have to:



1. Find the _placeholders_ 



   

{% highlight java linenos %}
   String phPattStr = "\\(\\?<(?<id>[^>]*)>\\([^)]*\\)[^)]*\\)";
   java.util.regex.Pattern phPatt = java.util.regex.Pattern.compile(phPattStr);
   
   Matcher phFinder = phPatt.matcher(str);
   while(phFinder.find()) {
       placeholders.add(phFinder.group("id"));
   }
   
{% endhighlight %}





2. Find the _variables_



   

{% highlight java linenos %}
   String varPattStr = "\\\\\\$(?<id>[a-zA-Z][a-zA-Z0-9]*])";
   java.util.regex.Pattern varPatt = java.util.regex.Pattern.compile(varPattStr);
   
   Matcher varFinder = varPatt.matcher(str);
   while(varFinder.find()) {
       variables.add(varFinder.group("id"));
   }
   
{% endhighlight %}





3. Set the templates for regeneration (remember that placeholders behave like variables in the output)



   

{% highlight java linenos %}
   outputTemplate = phFinder.replaceAll("\\\\\\$${id}");
   inputTemplate = str;
   
{% endhighlight %}





4. Initialize the `pattern` and `generator` in case they won't be needing regeneration:



   

{% highlight java linenos %}
   if(variables.isEmpty()) {
       pattern = java.util.regex.Pattern.compile(inputTemplate);
       if(placeholders.isEmpty()) {
           generator = new Generex(outputTemplate);
       }
   }
   
{% endhighlight %}





### Pattern regeneration - Variable replacement



First of all, we'll make a static class called `RegexAdapter` (that we'll extend in the following chapter) which, for now, will contain a single function `replaceVariables`:





{% highlight java linenos %}
public static String replaceVars(String expr) {
    String varPattStr = "\\\\\\$(?<id>[a-zA-Z][a-zA-Z0-9]*])";
    java.util.regex.Pattern varPatt = java.util.regex.Pattern.compile(varPattStr);
	Matcher matcher = varPatt.matcher(expr);
    while(matcher.find()) {
        PyObject pyValue = Script.pyMachine.get(matcher.group(1));
        String value = pyValue == null? "" : pyValue.asString();
        expr = matcher.replaceFirst(value);
        matcher.reset(expr);
    }

    return expr;
}

{% endhighlight %}





_Here we used the same regular expression as before to build varPatt. We could store it in a final static attribute in the `RegexAdapter` to reuse it, instead of rewrite it each time._



#### In Matching



We have to make two main changes in the matching function:



1. Now we have to check if we use the `pattern` or a new one we generate from the `inputTemplate`:



   

{% highlight java linenos %}
   java.util.regex.Pattern localPatt;
   if(pattern != null){
       localPatt = pattern;
   }else {
       String recognizerStr = RegexAdapter.remplaceVars(inputTemplate);
       localPatt = java.util.regex.Pattern.compile(recognizerStr);
   }
   
{% endhighlight %}





2. Then, when it matches, update inner state if the pattern contains _placeholders_:



   

{% highlight java linenos %}
   java.util.regex.Matcher matcher = localPatt.matcher(str);
   boolean match = matcher.matches();
   if(match) 
       for(String ph: placeholders) {
           String value = matcher.group(ph);
           if(!ph.isEmpty())
               Script.pyMachine.set(ph, value);
       }
   
{% endhighlight %}





#### In Generation



In the generation function there is only a change needed, as we don't have to modify the inner state.



1. We have to check if we use the `generator` or a new one we generate from the `outputTemplate`:



   

{% highlight java linenos %}
   Generex localGen;
   if(generator != null) {
       localGen = generator;
   }else{
       String generatorStr = RegexAdapter.remplaceVars(outputTemplate);
       localGen = new Generex(generatorStr);
   }
   
{% endhighlight %}





## Conclusion



That's it, we have implemented variables in our chatbot engine. It is beginning to be obvious that the input and output patterns should be separated in different classes. Anyways, if I do those changes, I won't document them here.



There is something we must take on count when using placeholders: the modification of the inner state occurs independently of the validity of the response it belongs to. **This means that a response could have an invalid condition, but the mere check of the input could modify the inner state**. For now we have to rely on the common sense of the user to make an intelligent use of variables and that is not a very good idea. We will have to implement a scoping system for this modifications sometime in the future .



Anyways, the next chapter will be a special one. Even though it will be a part of this series, I intend it to be readable by its own. We will be extending the class `RegexAdapter`, to offer to the user the option to use normal regular expressions or a version we'll craft to simplify the most common uses.


