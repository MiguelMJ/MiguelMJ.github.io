---
layout: post
title: Writing a Conversational Interface Library - Regular Expressions for I/O
date: 2020-08-21
author: Miguel MJ
tags: ['\n  -log', '\n  -project', '\n  -regex']
dev_url: https://dev.to/miguelmj/writing-a-conversational-interface-library-part-3-55n4
---
In the [last post](https://dev.to/miguelmj/writing-a-conversational-interface-library-part-2-2iad) we defined the requisites of the project. I started in order and began with the input and output based on regular expressions.



### Regular expressions in Java

Regular expressions are supported in Java with the package [java.util.regex](https://docs.oracle.com/javase/8/docs/api/index.html?java/util/regex/package-summary.html). Its usage is pretty straightforward for the pattern matching, but does not support string generation.



As usual, someone had already asked [what I needed to know]((https://stackoverflow.com/a/22133/8757033)) in stackoverflow, and thus I found the library [Generex](https://github.com/mifmif/Generex/), _a Java library for generating String from a regular expression_.



### Setting up the project

Almost always I prefer to work from the terminal. I strongly believe that being able to manage your code without an IDE gives you better understanding of the underlying processes of compiling and debugging. Still, I am not going to refuse the facility of an IDE if what I care about is that the project moves forward.

- At first, I tried to build Generex from source, but I'm not familiar with this process in Java and it looked like more effort than it was worth, so I decided to go with Maven.

- I tried to use Maven from the command line. I read some tutorials and got a Hello World compiled, but again I had problems using the dependencies for the real project.

- What I had to do was clear; I didn't switch from C++ to Java to complicate my life, so I launched Eclipse, imported the Maven project([1](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html))([2](https://www.tutorialspoint.com/maven/maven_eclispe_ide.htm)) and had Generex up and running in seconds.



### A custom Pattern class

Once with my work environment ready, I created a `Pattern` class. Initially I debated whether it was necessary to make a unified class for the input and output patterns, instead of a separate one for each, but I came to the conclusion that for now I needed simplicity and in the end there was not a big conceptual difference.

This class contained a `java.util.regex.Pattern` for the matching and a `Generex` for the generation. I was worried I was using more memory than necesary ,given that I won't be using them at the same time, but again, I followed this quote whose author I never remember:

> Is easier to optimize clean code than to clean optimized code.



### Testing

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



### Conclusion

This was still the easy part and I didn't really expect the test to fail, but this kind of motivation is important, even in the beginning.



I decided to name this project JTASCHE, to make the difference with TASCHE. The code is available on GitHub.




