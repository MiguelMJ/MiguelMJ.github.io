---
layout: post
title: Programming mathematical objects
date: 2023-01-26
links:
    Hashnode: https://miguelmj.hashnode.dev/programming-mathematical-objects
    DEV.to: https://dev.to/miguelmj/programming-mathematical-objects-1n3n
---

## Introduction

This post is divided into two main parts. In the first one, I'm going to introduce mathematical objects and mathematical applications. It is programmer-oriented, but I assume some level of math knowledge. In the second part, I will tell my personal experience discovering and researching previous work on this same topic.

*Note*: In case you know it, the [Wolfram Language](https://www.wolfram.com/language/) may come to your mind while reading this post. It is probably the most powerful tool out there for programming mathematics, as it is the result of years of continuous work by a very talented team. However, I won't talk about it here because even though it is [more accessible than I thought at first](https://blog.wolfram.com/2021/11/30/six-reasons-why-the-wolfram-language-is-like-open-source/), it imposes restrictions that I didn't want to deal with. I was not going to expect my reader to do so if I didn't, in the first place.

## What are mathematical objects?

Anything we use to make math is a mathematical object. For example, numbers ({%katex inline%}3{%endkatex%}, {%katex inline%}27{%endkatex%}, {%katex inline%}-80{%endkatex%}, {%katex inline%}3.15{%endkatex%}, ...), symbols ({%katex inline%}+{%endkatex%}, {%katex inline%}-{%endkatex%}, {%katex inline%}={%endkatex%}, {%katex inline%}\pi{%endkatex%}, {%katex inline%}\epsilon{%endkatex%}, {%katex inline%}\sqrt{}{%endkatex%}, ...) and variables ({%katex inline%}x{%endkatex%}, {%katex inline%}y{%endkatex%}, ...). From simple mathematical objects, we can build other more complex, like operations ({%katex inline%}3+5{%endkatex%}, {%katex inline%}2^x{%endkatex%}, {%katex inline%}A \cup B{%endkatex%} ...), relationships ( {%katex inline%}2 \lt 3{%endkatex%}, {%katex inline%}x \ne 10{%endkatex%}, {%katex inline%}1 = 1{%endkatex%} ) and even full theorems ( {%katex inline%}\forall x, y \in \mathbb{N}, x<y \iff \exists z \in \mathbb{N}:x+z=y{%endkatex%} ).

Modern programming languages provide all kinds of interfaces to represent and manipulate mathematical objects. Numbers, for example, are present in any non-esoteric language you will stumble upon. But what about more complex objects?

## Mathematical objects in programming languages

### Mathematical objects as data structures

While mathematical objects are relatively abstract concepts, their implementation in a computer is directly related to data structures. Different languages define different native data structures, and each compiler/interpreter implements the operations on said data structures, determining the mathematical objects that can be manipulated by that programming language without additional programming.

I say "without additional programming" because, in the end, all programming languages (the Turing-complete ones) are equivalent. Since we live in the future, you will find that popular languages have libraries that implement anything you can think of.

### Languages for mathematical applications

MatLab works natively with matrices and their operations. Do you want to work with matrices in Python? With NumPy, you can, but it will be a little bit harder than with MatLab. Do you want to work with matrices in C? You also can, but it will be harder than with Python.

This is just a crude case of how different languages handle better some mathematical objects. And while matrices are a relatively common thing to use in programming languages, other math concepts are not. Remember that we are talking about very different fields of mathematics. You would be surprised how cleaner or even faster can be a program written in less conventional languages like Haskell or Prolog, depending on the problem.

So imagine you need an application capable of handling a lot of different math concepts: arithmetic, algebra, logic, geometry... What are your options as a programmer?

* You can choose a single multi-purpose language, like Python, R or Julia, that have immense repositories of libraries of all sorts. You may find redundancies that you would need to contemplate and probably translate to common data structures. Also, some concepts might end up being difficult to use in an idiomatic, clean way. Or, on the contrary, to make them idiomatic, they turn out to be poorly optimized.
    
* You could use more than one language and glue them somehow or even embed one into another. This way, you could take advantage of the benefits of each. Have you ever wondered how powerful could be an application made with JavaScript + Python (PyScript) + Prolog (TauProlog)? That sounds like the [third wave of AI](https://www.youtube.com/watch?v=-O01G3tSYpU) to me! Just kidding, sounds very interesting but just reading it already gives me a headache.
    
* Another option is to turn your application into different distributed services. Collaboration is key to growth, isn't it? What if we implemented specialized services for different math fields and tasks and then make them talk to each other? It has the advantages of both previous points. You have a modular architecture, you can reuse code and you can use different languages, the most suited for each task.
    

## Distributed math applications

### Shared formats as middleware

When you connect several applications, you need formats. We could let each application communicate the way it wanted and enable the main system to interpret every possible format, but that's not scalable.

The Web is the best example of this. Everything you display on a webpage is HTML **by convention**. There are countless markup languages, document formats... but if you want something rendered in your browser, you better translate it to HTML. Look at Mathjax or KaTeX. We didn't want to write mathematical equations directly in HTML, because LaTeX was better for that. So we made applications that translated it into HTML.

### Formats for humans vs Semantic formats for machines

Standard formats are powerful. When machines are able to communicate, everything is better. But HTML and CSS, for example, are a special case for one reason: their final target are human eyes. An HTML page might be a complete mess, but if it renders into a human-readable page, it's alright.

In fact, when we decided that we wanted the web to be machine-readable, the concept of the [semantic web](https://en.wikipedia.org/wiki/Semantic_Web) was born. Because machines do not care about presentation, they care about **semantics**: the meaningful information they can parse from the used formats.

### Semantic math formats

And here's the problem with a lot of formats for mathematical object representation; they are made to present information to humans, not to machines. LaTeX, for example, doesn't hold much semantic information.

{%katex inline%}xy + sin(e){%endkatex%}

The expression above is written in valid LaTeX, but it is pretty ambiguous. Is {%katex inline%}xy{%endkatex%} a single variable, or the product of {%katex inline%}x{%endkatex%} and {%katex inline%}y{%endkatex%}? Is {%katex inline%}e{%endkatex%} the Euler constant or an independent variable? We don't know, because LaTeX is not a semantic format. A human would know the answers thanks to the context in which we use the expression, but probably that context is not machine-readable.

Wikipedia points out three main [formats for computer interchange](https://en.wikipedia.org/wiki/Mathematical_markup_language): MathML, OpenMath and OMDoc. The people involved in the development of each one worked on the others too, so they are sort of complementary.

* [**MathML**](https://www.w3.org/TR/MathML3/) has two variants: Presentation MathML, which doesn't hold semantic information, and Content MathML, which does. The mechanism for describing the semantics of its symbols is not present in the format itself. For that, it relies on the OpenMath standard (or similar alternatives).
    
* [**OpenMath**](https://openmath.org/) provides two encodings to represent mathematical objects and also defines an extensible mechanism to describe the semantics of its symbols: the **Content Dictionaries**. There are official dictionaries that describe various symbols for different fields of mathematics, but any person or organization could define more dictionaries to extend the number of objects representable by the format. This way, an application that uses follows this standard only has to specify which dictionaries it supports.
    
* [**OMDoc**](https://www.omdoc.org/), on the other hand, is some kind of extension to both MathML and OpenMath, designed to represent mathematical documents for humans and machines alike.
    

*Note*: I shouldn't finish this section without mentioning the existence of SCSCP (Symbolic Computation Software Composability Protocol). It is a protocol developed to communicate distributed systems for mathematical computation, or CAS (Computer Algebra System). It is built on top of the OpenMath standard to describe a server-client communication oriented to mathematical objects.

## My experience with the OpenMath standard

### First encounter - Apparent death

OpenMath is the best suited standard to communicate distributed math applications.

I was really excited when I found this standard. As long as an application supported the OpenMath encoding (OM), it could be communicated with lots of other interesting applications easily, with a common format. A whole new world of possibilities for collaboration! I was sure I would find applications to transform OM into renderable formats like LaTeX or HTML, reduce or evaluate complex mathematical expressions, transform function definitions into code, etc.

However, disappointment came when I continued to research. Reading the openmath.org page I found a list of projects that used the standard. The first time I clicked on one: broken link. But, hey! the next link works! ... and the linked project is obsolete; it has unresolved and unfindable dependencies. The official page is **full** of broken links and obsolete, incomplete and undocumented projects.

But it did not feel like abandonware from decades ago; there were things dated less than a few years ago. It was the same feeling as being late for a party that had just ended.

### Finding the trail

I only found a [Python library](https://github.com/OpenMath/py-openmath) and a [JS package](https://lurchmath.github.io/openmath-js/site/) implementing the standard, that seemed to be active to some extent... but neither of them contemplated the full specification.

The one in JS is [a bit basic](https://lurchmath.github.io/openmath-js/site/work-done/). And when I tried to use the Python one, I didn't find it easy to do anything with it apart from parsing and serializing XML; it felt like the mathematical objects were not programmed to be manipulated easily. Of course, that can be (and probably is) my fault, because the library is used in another [SCSCP library](https://github.com/OpenMath/py-scscp), where it proves to be useful.

At first, I didn't give too much attention to the SCSCP library, because I thought it was not related to what I was looking for. I started my own Python implementation of the standard (*if you visit it on my GitHub keep in mind it is very unstable and mostly experimental for now*) and forgot about any official implementation.

However, I recently returned to that library, trying to understand it better with the knowledge acquired by working with OpenMath on my own. The SCSCP library caught my attention this time, and I followed one link after another until I understood what was going on. Part of these projects was recently funded by the EU in a program to foster the development of a European research infrastructure called [OpenDreamKit](https://github.com/OpenDreamKit) that happened to finish in 2020. In fact, there are two more projects built on top of both the OpenMath and SCSCP Python libraries that belong to said infrastructure and seem to have little attention from other developers, even though they seem to be the only current functioning projects based on that technologies.

### My interpretation

*Disclaimer*: I don't talk on behalf of anyone except myself and I might have incomplete or wrong information about what's been going with OpenMath on in the last decades.

I've spent many hours browsing the pages related to OpenMath and I've come to a conclusion. It looks like a lot of this work started long ago, in the nineties, which explains why there is so much that's become obsolete (so it is in fact like abandonware from decades ago). To me, it looked like back then their work was more similar to projects of software development. But their society has always been closely related to universities and public funds (similar to the OpenDreamKit one). So their current available work is very academic! They have papers instead of documentation and research groups instead of communities.

They made their last workshop a year and a half ago (Jul 2021) so they were active recently... But then, why don't they update their website to reflect the actual state of the project? Why isn't there any work to integrate the standard into modern, popular frameworks used for mathematics? I've come to think that it's just that, if they are actually still active, I'm out of the appropriate communication channels. I don't know if I'm in an empty room or just in the wrong room.

## Conclusion

Is the project just close to a death of disinterest? Or maybe the circles using and developing it are **not** the circles of software developers, but of researchers and academics? I honestly don't know. But, also, I don't care! I found the project to be fascinating and full of potential. The OM Society might not have the same philosophy as other modern open source projects, but their work is there for us to use it.

I think the idea of distributed mathematical systems is **wonderful**. But not only for researchers, who are the people using them right now; **also for developers**! My intention with this post was to make these concepts and possibilities known to people interested in working on open source projects like the ones we do know, in the hope that new, open and active communities can be formed.

---

**If you liked this topic, let me know and I will write more about it!** ✍🏻 I haven't explained anything about the format, encodings and content dictionaries of the OpenMath standard, so I'll probably write another post explaining how to use and implement them.

## References

* [https://www.omdoc.org/about/](https://www.omdoc.org/about/)
    
* [https://openmath.org/about/](https://openmath.org/about/)
    
* [https://www.w3.org/TR/MathML3/](https://www.w3.org/TR/MathML3/)
    
* [Symbolic Computation Software Composability Protocol - SCSCP - Specification, Version 1.3](https://github.com/OpenMath/scscp/blob/master/revisions/SCSCP_1_3.pdf)
    
* [OMDoc – An Open Markup Format for Mathematical Documents](https://link.springer.com/content/pdf/10.1007/11826095.pdf?pdf=button)
    
* [Interoperability in the OpenDreamKit project: the Math-in-the-Middle approach](https://github.com/OpenDreamKit/OpenDreamKit/blob/master/WP6/CICM2016/published.pdf) (3rd section)