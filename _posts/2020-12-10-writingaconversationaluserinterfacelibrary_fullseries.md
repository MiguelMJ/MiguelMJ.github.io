---
layout: post
title: Writing a Conversational User Interface Library - Full Series
author: Miguel MJ
date: 2020-12-10
dev_url: https://dev.to/miguelmj/writing-a-conversational-user-interface-library-full-series-3dc5
---
For the last months, I've been writing this series on the development of JTASCHE (Java Text Adventure and Simple Chatbot Engine). This post is meant to merge all the chapters. I don't expect anyone to read it all... maybe someone will find a cool idea or some inspiration, but the real purpose to publish it is to unify this journal in a single file.

**Table of contents**

<span id="toc"></span>

- [1. The idea](#The-idea12)
- [2. The design](#The-design26)
    - [General description](#General-description30)
    - [Requisites](#Requisites34)
      - [Input](#Input36)
      - [Output](#Output42)
      - [Internal state](#Internal-state48)
      - [Dialogue flow format](#Dialogue-flow-format54)
    - [Synopsis](#Synopsis60)
- [3. Regular Expressions for I/O](#Regular-Expressions-for-I/O80)
    - [Regular expressions in Java](#Regular-expressions-in-Java84)
    - [Setting up the project](#Setting-up-the-project90)
    - [A custom Pattern class](#A-custom-Pattern-class100)
    - [Testing](#Testing108)
    - [Conclusion](#Conclusion135)
- [4. Scripting Language for Inner State](#Scripting-Language-for-Inner-State141)
    - [Jython](#Jython147)
      - [Embed it to the project](#Embed-it-to-the-project151)
    - [Script class](#Script-class155)
    - [Testing](#Testing173)
    - [Conclusion](#Conclusion204)
- [5. Structures](#Structures212)
      - [Some notation](#Some-notation224)
    - [The `Response` class](#The-`Response`-class229)
      - [Valid responses](#Valid-responses237)
      - [Simple response](#Simple-response249)
      - [Recursive Response](#Recursive-Response267)
    - [The `Module` class](#The-`Module`-class290)
    - [The `CUI` class ](#The-`CUI`-class-298)
    - [Conclusion](#Conclusion306)
- [6. Serialization of the dialogue flow](#Serialization-of-the-dialogue-flow312)
    - [GSON](#GSON316)
  - [Intermediate classes for serialization](#Intermediate-classes-for-serialization322)
    - [`SerializableResponse`](#`SerializableResponse`326)
      - [Java to JSON](#Java-to-JSON344)
      - [JSON to Java](#JSON-to-Java361)
    - [`SerializableModule`](#`SerializableModule`387)
  - [Load and save a `CUI`](#Load-and-save-a-`CUI`401)
  - [Let's see a basic example](#Let's-see-a-basic-example405)
  - [Conclusion](#Conclusion437)
- [7.  Variables and Placeholders](#Variables-and-Placeholders445)
  - [Regex Named Capturing Groups in Java](#Regex-Named-Capturing-Groups-in-Java463)
      - [Backreferencing](#Backreferencing492)
  - [Variables and placeholders](#Variables-and-placeholders514)
  - [Implementation](#Implementation536)
    - [Preprocessing the string to build a Pattern - I used the regex to preprocess the regex](#Preprocessing-the-string-to-build-a-Pattern---I-used-the-regex-to-preprocess-the-regex546)
    - [Pattern regeneration - Variable replacement](#Pattern-regeneration---Variable-replacement596)
      - [In Matching](#In-Matching619)
      - [In Generation](#In-Generation650)
  - [Conclusion](#Conclusion667)
- [8. Adapted Regular Expressions](#Adapted-Regular-Expressions675)
  - [Features](#Features681)
  - [RegexAdapter class](#RegexAdapter-class712)
      - [Example](#Example771)
  - [Conclusion and revision](#Conclusion-and-revision793)
- [Closing the project](#Closing-the-project811)


<h1 id="The-idea12">1. The idea<small><a href="#toc">  [TOC]</a></small></h1> 

One of the things that caught my attention before I started studying Computer Science were **chatbots**. I'd always loved the idea of speaking to machines, but the quality of real chatbots obviously wouldn't be up the incredible AIs of sci-fi movies.

When I learnt the two main approaches to chatbot-like applications used today, machine learning based and rule based, I knew I had the spirit but lacked the skills to follow the first one. Therefore, I did my research on the second one and found AIML.

Yet, as time passed, I started to become more and more interested in developing my own tool, rather than the chatbot itself. I wanted to make something at least as powerful as AIML and hopefully better.

After a year or two, between studies and other projects, I managed to finish the first version of TASCHE (link below), a library to design dialogue flows in JSON, a custom format for the patterns and a custom pseudolanguage to modify its internal state. It was not as great as my first-year-in-uni self would dream, but it worked and was definitely set on the right path.

As I was still learning during the process, it suffered a lot of transformations. It's enough to say that the first pattern parser was written from scratch in several thousand lines of code, before being replaced by a more legible Flex + Bison version. I wrote it in C++ because its my main language and I needed to focus on the structures and algorithms. Now, five years after the first draft, I've chosen Java to rewrite it and try to improve it in the process.

I'll keep this series to explain the internals of TASCHE and its evolution. I think my first-year-in-uni self will enjoy it.

<h1 id="The-design26">2. The design<small><a href="#toc">  [TOC]</a></small></h1> 

Before we properly start to code, we must define the requisites of the project to have a general understanding of what we have to implement and how we plan to do it.

<h3 id="General-description30">General description</h3> 

The Conversational Interface Library will provide the user with a **Conversational User Interface** (CUI from now) class. A CUI must be able to load a dialogue flow specified by the user and answer their input according to it, modifying its internal state if it's necessary. It can be thought of as an automaton.

<h3 id="Requisites34">Requisites</h3> 

<h4 id="Input36">Input</h4> 

When we think about user input, we have to always assume that we won't consider all the possibilities. Anyways, we want to consider as many as possible in the shortest specification we can.

The most powerful tool we have to do this are regular expressions. But, as regular expressions can sometimes be a little too complicated, we will think about creating a simpler format, easier for the user, that translates underneath to a regular expression.

<h4 id="Output42">Output</h4> 

If we want a chatbot to feel as natural as possible, diversity of answers is a must. For this we will not only use a list of possible expressions to randomly choose from, but we will also group many different answers with little variations in the same expression.

Again, we can use regular expressions to generate strings. This is not their usual purpose, but there are libraries that allow as to do it.

<h4 id="Internal-state48">Internal state</h4> 

The internal state of the chatbot creates the context of the conversation, so for the same input, different output comes depending on what's been said earlier.

The most flexible and powerful way to contain and modify the internal state is to use an embedded scripting language.

<h4 id="Dialogue-flow-format54">Dialogue flow format</h4> 

The dialogue flow then must associate input and state with a list of possible answers and state modifications. The ideal format would be one legible, without redundant information (except when it's for clarity) and customizable.

We will design a structure to contain the proper dialogue flow and use JSON to store it.

<h3 id="Synopsis60">Synopsis</h3> 

From all we've said, the following specifications are extracted:

We will use

- regular expressions for input matching.

- regular expressions for output generation.

- optional simplification of regular expressions for the user.

- scripting language for internal state representation and modification.

- custom data structure to associate input, state and output.

- JSON to store such structure.

The first implementation I did in C++ (see [Part 1 of this series](https://dev.to/miguelmj/writing-my-conversational-interface-library-part-1-1jh3)) used its own version, built from scratch, of most of these features. But this time I'll find out what Java libraries I can use for the same purpose, because once you've reinvented the wheel in order to learn (which is a noble cause), you should use professionally built, tested and maintained wheels. That will reduce the effort you need to build, test and maintain your project.

<h1 id="Regular-Expressions-for-I/O80">3. Regular Expressions for I/O<small><a href="#toc">  [TOC]</a></small></h1> 

In the [last post](https://dev.to/miguelmj/writing-a-conversational-interface-library-part-2-2iad) we defined the requisites of the project. I started in order and began with the input and output based on regular expressions.

<h3 id="Regular-expressions-in-Java84">Regular expressions in Java</h3> 

Regular expressions are supported in Java with the package [java.util.regex](https://docs.oracle.com/javase/8/docs/api/index.html?java/util/regex/package-summary.html). Its usage is pretty straightforward for the pattern matching, but does not support string generation.

As usual, someone had already asked [what I needed to know]((https://stackoverflow.com/a/22133/8757033)) in stackoverflow, and thus I found the library [Generex](https://github.com/mifmif/Generex/), _a Java library for generating String from a regular expression_.

<h3 id="Setting-up-the-project90">Setting up the project</h3> 

Almost always I prefer to work from the terminal. I strongly believe that being able to manage your code without an IDE gives you better understanding of the underlying processes of compiling and debugging. Still, I am not going to refuse the facility of an IDE if what I care about is that the project moves forward.

- At first, I tried to build Generex from source, but I'm not familiar with this process in Java and it looked like more effort than it was worth, so I decided to go with Maven.

- I tried to use Maven from the command line. I read some tutorials and got a Hello World compiled, but again I had problems using the dependencies for the real project.

- What I had to do was clear; I didn't switch from C++ to Java to complicate my life, so I launched Eclipse, imported the Maven project([1](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html))([2](https://www.tutorialspoint.com/maven/maven_eclispe_ide.htm)) and had Generex up and running in seconds.

<h3 id="A-custom-Pattern-class100">A custom Pattern class</h3> 

Once with my work environment ready, I created a `Pattern` class. Initially I debated whether it was necessary to make a unified class for the input and output patterns, instead of a separate one for each, but I came to the conclusion that for now I needed simplicity and in the end there was not a big conceptual difference.

This class contained a `java.util.regex.Pattern` for the matching and a `Generex` for the generation. I was worried I was using more memory than necesary ,given that I won't be using them at the same time, but again, I followed this quote whose author I never remember:

> Is easier to optimize clean code than to clean optimized code.

<h3 id="Testing108">Testing</h3> 

I have not used JUnit before, so I was glad to discover it's not a big deal. I prepared a single test to check that a simple `Pattern` could generate different strings, and match them all as true.

The regular expression used for the test is:



{% highlight  linenos %}
(Hi|Hello), how are you( today)?\?


{% endhighlight %}



and everything went well, as the output shows (`[OK]` means that the pattern matched the generated string).



{% highlight  linenos %}
Generated: Hi, how are you today?[OK]
Generated: Hello, how are you?[OK]
Generated: Hi, how are you today?[OK]
Generated: Hello, how are you?[OK]
Generated: Hi, how are you?[OK]
Generated: Hi, how are you today?[OK]
Generated: Hello, how are you today?[OK]
Generated: Hi, how are you today?[OK]
Generated: Hello, how are you?[OK]
Generated: Hello, how are you?[OK]


{% endhighlight %}



<h3 id="Conclusion135">Conclusion</h3> 

This was still the easy part and I didn't really expect the test to fail, but this kind of motivation is important, even in the beginning.

I decided to name this project JTASCHE, to make the difference with TASCHE. The code is available on GitHub.

<h1 id="Scripting-Language-for-Inner-State141">4. Scripting Language for Inner State<small><a href="#toc">  [TOC]</a></small></h1> 

In the last post we made `Pattern`, a class to recognize input and produce output. Now we'll make another one that let us interact with the inner state of the CUI.

As we decided during the design, we will contain and modify the inner state via an embedded scripting language. Java supports [several scripting languages](https://java-source.net/open-source/scripting-languages) and for this project we'll be using [Jython](https://www.jython.org/).

<h3 id="Jython147">Jython</h3> 

As its official page says, _Jython is a Java implementation of Python that combines expressive power with clarity_. Its advantages are that it's super easy to embed in Java and the simplicity of the Python language. The main downside is that the last Python supported version is the 2.7, which is [not currently mantained](https://pythonclock.org/). As this is a hobby project, I won't take that on count, but in a different case I would probably consider another option (e.g. I'd like to embed Lua in the original TASCHE).

<h4 id="Embed-it-to-the-project151">Embed it to the project</h4> 

The normal version of Jython requires it installed in your machine, but there is a stand-alone version which runs on its own and can be added as a simple Maven dependency (as we did with Generex in the last part). We'll be using that one.

<h3 id="Script-class155">Script class</h3> 

In our library, there are two main purposes for the `Script` class:

1. Check a condition against the inner state.

2. Modify the inner state.

So the structure of this class is pretty straightforward. We have:

- A static reference to the `PythonInterpreter` that contains the inner state.

- A `String` that contains the code of the script.

- A function to evaluate it as a boolean (with the Jython `__nonzero__` function).

- A function to simply execute the code.

<h3 id="Testing173">Testing</h3> 



{% highlight Java linenos %}
// A SUCCESSFUL TEST
Script[] scripts = new Script[10];
Script.pyMachine.exec("a = 5; b=3; c='hola'");
// this should eval true
scripts[0] = new Script("a == 5");
scripts[1] = new Script("b ==3");
scripts[2] = new Script("c[b] == 'a'");
scripts[3] = new Script("'0'");
scripts[4] = new Script("1");
// this should eval false
scripts[5] = new Script("a==b");
scripts[6] = new Script("h=4;False");
scripts[7] = new Script("c[0]=='o'");
scripts[8] = new Script("0");
scripts[9] = new Script("''");
	
boolean ok = true; int i=0;
for(Script s: scripts) {
	boolean ev = s.evaluate();
	ok &= i++ < 5 == ev;
}


{% endhighlight %}



As this class is mainly a wrapper of Jython's `PyCode`, there was little to test but the basic functionality. The only thing worth mentioning is that, as intuitive as it may sound, the state of the `PythonInterpreter` object persists between different `Scripts` executions and evaluations.

_Note that if, in the future, we wanted to have different Conversational Interfaces running with different inner states (be it sequentially or concurrently), we would have to set the static instance before executing/evaluating any script._

<h3 id="Conclusion204">Conclusion</h3> 

Now with our `Pattern` and `Script` classes we have the basic building blocks to define a structure that associates input and conditions to output and state changes. From now we won't rely much more in third-party libraries (except Gson, which I'll explain).

After we have this structure, we will be able to write dialogue flow examples to test some new features like patterns modifying the inner state and possibly the regex simplification we planned during the design.

Don't forget to check the repository for the code!

<h1 id="Structures212">5. Structures<small><a href="#toc">  [TOC]</a></small></h1> 

The classes we've got right now are `Pattern`, for matching input and producing output, and `Script` for checking and modifying the inner state of the CUI. With these two, we want to make a structure that:

1. Receives user input.
2. Matches it against a pattern.
3. Checks a condition in the inner state.
4. If the input matches and the condition is satisfied, it either:

  - **a)** Produces some output and executes a change in the state. 
  - **b)** Processes the input further until it gets to produce an output or discard the response.

<h4 id="Some-notation224">Some notation</h4> 

- We will call **question** to the user input, that the `Response` tries to match.
- Given a question, a `Response` is **valid** when the question matches the input pattern and the condition is satisfied.

<h3 id="The-`Response`-class229">The `Response` class</h3> 

We'll make a base `Response` class, which performs the first three steps and `SimpleResponse` and `RecursiveResponse`, that derive from it and implement an `answer` function, respectively for a options **a)** and **b)**.

![Response hierarchy](https://dev-to-uploads.s3.amazonaws.com/i/hldnz786g1lm9u4m0zr2.png)

_Note that the return type of the `answer` function is an `Optional`, because if the `question` is not valid, the function should not return anything._

<h4 id="Valid-responses237">Valid responses</h4> 



{% highlight Java linenos %}
public boolean isValid(String question) {
  return (input == null     || input.matches(question)) &&
         (condition == null || condition.evaluate());
}


{% endhighlight %}



We will use null input patterns for responses that should adapt to any question and null conditions for responses that should not depend on the inner state.

<h4 id="Simple-response249">Simple response</h4> 

The algorithm that `SimpleResponse` uses to answer a question is:



{% highlight Java linenos %}
public Optional<String> answer(String question) {
    Optional<String> ans = Optional.empty();
    if(isValid(question)){
        ans = Optional.of(output.generate());
        if(execute != null) execute.execute();
    }
    return ans;
}


{% endhighlight %}



The `execute` script doesn't need to be present, but the output pattern can't be null, as something needs to be returned, even if it's an empty string.

<h4 id="Recursive-Response267">Recursive Response</h4> 

The algorithm used by a `RecursiveResponse`, instead, is:



{% highlight Java linenos %}
public Optional<String> answer(String question) {
    Optional <String> ans = Optional.empty();
    if(isValid(question)) {
        if(new_question != null) {
            question = new_question;
        }
        for(Response response : responses) {
            ans = response.answer(question);
            if(ans.isPresent()) break;
        }
    }
    return ans;
}


{% endhighlight %}



In this case, the first sub-response able to answer the question will be the only one returned. This could be tweaked later, to enable recursive responses that append all possible answers, but for now we'll leave it this way.

<h3 id="The-`Module`-class290">The `Module` class</h3> 

We may want a default value for certain variables the first time we check a condition or define some useful functions to avoid repeating code. The `Module` class will be used to group a set of responses that can be related or use the same variables of the inner state, and also include a initialization script to run before any of its `Response`s is used.

![Module class](https://dev-to-uploads.s3.amazonaws.com/i/qgqvo6t4zekbzme3dgrp.png)

The `answer` method behaves the same way as the one from `RecursiveResponse`.

<h3 id="The-`CUI`-class-298">The `CUI` class </h3> 

At last, we can create the CUI class, which is no more than a collection of `Module`s and a `PythonInterpreter` to set the static reference of the `Script`, which we explained in [the last part](https://dev.to/miguelmj/writing-a-conversational-user-interface-scripting-language-for-inner-state-49ll#script-class).

![CUI class](https://dev-to-uploads.s3.amazonaws.com/i/hlyqq2349s0fp0g7t2id.png)

The `answer` function in this class doesn't return a `Optional` because defaults any response to an empty string, and appends the result of calling `answer` on every one of its modules when they don't return an empty `Optional`.

<h3 id="Conclusion306">Conclusion</h3> 

Now we have the structures and the logic necessary for the basic functionality of our library! The following step to take will be to implement the serialization and deserialization of these structures, which will be done to a JSON format via the GSON library.

The real code is on GitHub, if you want to check it and star the project if you like it!

<h1 id="Serialization-of-the-dialogue-flow312">6. Serialization of the dialogue flow<small><a href="#toc">  [TOC]</a></small></h1> 

In the last post we defined the structures which contain the logic and data for the basic behaviour of a Conversational User Interface, which were `SimpleResponse`, `RecursiveResponse`, `Module` and `CUI`. But unless we want to hard code their content in every application, we need to serialize and deserialize them.

<h3 id="GSON316">GSON</h3> 

We are going to store our data in JSON format, so we'll make use of the [GSON](https://github.com/google/gson) _a Java serialization/deserialization library to convert Java Objects into JSON and back_, devolped by Google. As we did before with Generex and Jython, we just have to add the dependency to the `pom.xml` file of our Maven project and it will be ready to use.

GSON is a flexible and powerful library that could take [more than one post](https://www.tutorialspoint.com/gson/index.htm) to explain. Honestly, I didn't dive much into it, so I'm pretty sure there are better ways to do what I'm about to explain, but my task was not that complicated, so this solution is still flexible and open to future adaptations.

<h2 id="Intermediate-classes-for-serialization322">Intermediate classes for serialization</h2> 

Due to their complexity, our `Response` and `Module` classes can't be serialized directly by GSON, so the simplest way I came up with to deal with that was to make a serializable version of each one (`SerializableResponse` and `SerializableModule`) as an intermediary. 

<h3 id="`SerializableResponse`326">`SerializableResponse`</h3> 

This class just holds the `String` version of all possible attributes from each child of `Response`, which are:



{% highlight Java linenos %}
class SerializableResponse{
  public String input; // both
  public String output; // SimpleResponse
  public String condition; // both
  public String execute; // SimpleResponse
  public String new_question; // RecursiveResponse
  public List<SerializableResponse> responses; // RecursiveResponse

  public Response getResponse(){...}
}


{% endhighlight %}



<h4 id="Java-to-JSON344">Java to JSON</h4> 

The `Response` class needs a new abstract function `SerializableResponse serializable()` that will be implemented for each child and only has to fill each attribute of the serializable calling `toString()`.

**Note** that:

- In the case of the `Script`s, `PyCode` from Jython doesn't keep the code string, so we have to modify our class to do it in order to return it in its `toString` function.

- In the `RecursiveResponse` attribute `responses` this is a recursive call.

Now to serialize a `Response` we only need to do:



{% highlight Java linenos %}
jsonString = gson.toJson(myResponse.serializable());


{% endhighlight %}



<h4 id="JSON-to-Java361">JSON to Java</h4> 

Now we use the `SerializableResponse` kind of like a factory, with a function `Response getResponse()`. The only thing we have to do to discern wehter  to return a `SimpleResponse` or a `RecursiveResponse` is:



{% highlight Java linenos %}
// SerializableResponse getResponse
if (this.output != null){ // SimpleResponse (we allow this.execute to be null)
  // build a SimpleResponse with the string attributes
  // and return it
}else if(this.responses != null){ // RecursiveResponse (we allow new_question to be null)
  // build a RecursiveResponse with the string attributes
  // and return it
}else{
  // error
}


{% endhighlight %}




And so, to deserialize a `Response` we only have to:



{% highlight Java linenos %}
Response myResponse = gson(jsonString ,SerializableResponse.class).getResponse();


{% endhighlight %}



<h3 id="`SerializableModule`387">`SerializableModule`</h3> 

As you may be already expecting, this class is just a list of `SerializableResponse`s and a single additional `String` for the initialization script.



{% highlight Java linenos %}
class SerializableModule{
  public String init;
  public List<SerializableResponse> responses;
}


{% endhighlight %}



And the remaining logic to serialize and deserialize is similar to the explained previously.

<h2 id="Load-and-save-a-`CUI`401">Load and save a `CUI`</h2> 

With the logic to convert `Modules` to JSON and back, the function to load and save modules would take just a few lines. The only thing we still cannot load nor store yet would be the inner state, so for now our conversational applications won't keep any memory between sessions.

<h2 id="Let's-see-a-basic-example405">Let's see a basic example</h2> 



{% highlight JSON linenos %}
{
"init":"greeted=False",
"responses":[{
          "input":"(hello|hi)!*",
          "responses":[{
                  "condition":"not greeted",
                  "output":"Hi(, traveler)?",
                  "execute":"greeted = True"
              },
              {
                  "output":"Hello(, again|there)"
              }]
          }]
}


{% endhighlight %}



 Possible exchange:



{% highlight None linenos %}
User: hi!!
Bot: Hi, traveler
User: hello
Bot: Hello there
user: hello!!!
Bot: Hello, again


{% endhighlight %}



<h2 id="Conclusion437">Conclusion</h2> 

Finally we have covered what's necessary to define functional dialogue flows and test new features. From now on, all we'll do is extend what we have, because as the example shows, the scope of what this library offers is very limited compared to what we can still make.

The next step to take is to implement variables, so we can access and temporally modify the inner state directly from the `Pattern` class, in order to interpret the user input more intelligently. For this, we I will be explaining more advanced features of the regular expressions in Java.

You can check the code in GitHub, give it a star if you like it and see the documentation in [my new website](miguelmj.github.io/projects/JTASCHE.html).

<h1 id="Variables-and-Placeholders445">7.  Variables and Placeholders<small><a href="#toc">  [TOC]</a></small></h1> 

We already have a working chatbot engine, but as we saw in the example  of the last post, it's not very powerful. Now we are going to link the pattern matching and the inner state so we can make more specific checks on the user's input.

To do this we will have to make some preprocessing on the regular expressions we use, and even regenerate them several times during a session. **We will be making really heavy use of regular expressions**, so be prepared.

Note: In this post the word pattern can refer to different things, so before anything I want to make clear what it means depending on the format I use:



- Pattern, with capital P, refers to our custom class Pattern, that we defined in [Part 3](https://dev.to/miguelmj/writing-a-conversational-interface-library-part-3-55n4).

- java.util.regex.Pattern refers to the native class of Java.

- `pattern` refers to the java.util.regex.Pattern contained as an attribute in our custom Pattern class.



<h2 id="Regex-Named-Capturing-Groups-in-Java463">Regex Named Capturing Groups in Java</h2> 

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



<h4 id="Backreferencing492">Backreferencing</h4> 

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

<h2 id="Variables-and-placeholders514">Variables and placeholders</h2> 

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

<h2 id="Implementation536">Implementation</h2> 

The former implementation of Pattern we just had a `java.util.regex.Pattern pattern` and a `Generex generator`. Now, we may want to regenerate them before its use; let's see what are the conditions:

- For output generation, the _placeholders_ will be trated as _variables_ (their difference is only notable when matching input).

- This means that the `pattern` must be regenerated if the Pattern contains _variables_. The `generator`, furthermore, must be regenerated if the Pattern contains _variables_ or _placeholders_. 

- We need to add to our Pattern class the attributes `List<String> variables`, `List<String> placeholders`, `String inputTemplate` and `String outputTemplate`. **These last two will be used for regeneration**.

<h3 id="Preprocessing-the-string-to-build-a-Pattern---I-used-the-regex-to-preprocess-the-regex546">Preprocessing the string to build a Pattern - I used the regex to preprocess the regex</h3> 

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



<h3 id="Pattern-regeneration---Variable-replacement596">Pattern regeneration - Variable replacement</h3> 

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

<h4 id="In-Matching619">In Matching</h4> 

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



<h4 id="In-Generation650">In Generation</h4> 

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



<h2 id="Conclusion667">Conclusion</h2> 

That's it, we have implemented variables in our chatbot engine. It is beginning to be obvious that the input and output patterns should be separated in different classes. Anyways, if I do those changes, I won't document them here.

There is something we must take on count when using placeholders: the modification of the inner state occurs independently of the validity of the response it belongs to. **This means that a response could have an invalid condition, but the mere check of the input could modify the inner state**. For now we have to rely on the common sense of the user to make an intelligent use of variables and that is not a very good idea. We will have to implement a scoping system for this modifications sometime in the future .

Anyways, the next chapter will be a special one. Even though it will be a part of this series, I intend it to be readable by its own. We will be extending the class `RegexAdapter`, to offer to the user the option to use normal regular expressions or a version we'll craft to simplify the most common uses.

<h1 id="Adapted-Regular-Expressions675">8. Adapted Regular Expressions<small><a href="#toc">  [TOC]</a></small></h1> 

The regular expressions that we will use in our library are mostly to process [controlled natural language](https://en.wikipedia.org/wiki/Controlled_natural_language), so we are going to make an adapted version of them. We will have to give up some of the potential of regular expressions to gain usability for the most common cases in our library.

_Note: We are going to use regular expressions to process regular expressions, so they can get a little confusing. You may want to check out my post on [Correctly escaping regular expressions](https://dev.to/miguelmj/correctly-escaping-regular-expressions-27nc/)_

<h2 id="Features681">Features</h2> 

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

<h2 id="RegexAdapter-class712">RegexAdapter class</h2> 

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



<h4 id="Example771">Example</h4> 

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



<h2 id="Conclusion-and-revision793">Conclusion and revision</h2> 

Now we could add an option on each module or even each response that lets the user choose to either use a Regular Expression or an Adapted Expression, and use this function to transform these to those.

Since we had our first functional version, we have added_

- The possibility to read/write the inner state during the input matching and output generation.

- A simplified yet extensible version of the regular expressions for the user. 

This leaves us with the following issues:

- We still have to make a scoping system to control the modifications made during a match that was finally not successful.

- Add some options to the Pattern deserialization, to choose between Regular or Adapted expressions. 

As those are tweaks, more than essential features, I will document them in a post about the final tweaks to the library. For now, the next post will be about adding knowledge to our chatbots. We will add a feature to let the user to specify sets of words under concept categories.

<h1 id="Closing-the-project811">Closing the project<small><a href="#toc">  [TOC]</a></small></h1> 

That final post didn't came out. I didn't have the time to program the last part and I honestly didn't want to dedicate that much energy to a side project, specially one that is already effectively functional and is intended for other hobby projects.

This project has been fun. If you have read all, I hope you have extracted some value... if not, I can't blame you. For me, this was what I needed to start blogging and an excuse to revisit an old ambition. If I ever come back to work with JTASCHE, I highly doubt I'll write about it, but who knows.



