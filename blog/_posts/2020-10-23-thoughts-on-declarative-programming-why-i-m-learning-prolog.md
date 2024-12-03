---
layout: post
title: Thoughts on declarative programming
subtitle: Why I'm learning Prolog
date: 2020-10-23
description: First of all I want to state that in this post I will use declarative programming language to refer...
links:
  Hashnode: https://miguelmj.hashnode.dev/thoughts-on-declarative-programming-why-im-learning-prolog
  DEV.to: https://dev.to/miguelmj/thoughts-on-declarative-programming-why-i-m-learning-prolog-43be
---

First of all I want to state that in this post I will use _declarative programming language_ to refer to purely functional (Haskell, Miranda) and logical (Prolog) programming. No query languages (SQL) nor markup languages (XML).

Most of us (if not all) start our programming journey with an imperative language (C, Python, JS...). This way we learn to think about the algorithms, the step by step process to solve problems. I agree that this is the best way to start, but I believe that we, developers, should be curious by nature and try out new things. However, many prefer to keep their distance from declarative programming, without understanding how it would benefit them. Here are my thoughts on this topic.

## Why is declarative programming less popular?

**1. Computers don't work that way**

To begin with, computers themselves execute programs in an imperative manner (one instruction after another), and I'm pretty sure they always will, because we don't live in a mathematical realm where definitions _just apply_. For this reason, **imperative programming is a better way to learn the internals of your computer**, how your code is compiled into machine language, how it is executed, etc (even if it's an interpreted language, this concepts can be understood easier).

As I said, it is good to start like this, because the grasp you get of what's going on is really better.

**2. It feels like starting from zero**

The first time I was told to write a Haskell program in the second year of my degree, and I learnt that **I couldn't use assignation or loops**, I felt again like an absolute beginner. The difference in how data is handled and the fact that I didn't fully understand how the execution worked, with what I felt was an obscene amount of recursive calls, blocked me for a moment.

It is completely normal to think _"I would do this so much easier in my usual language, in which I have much more experience and that adjusts better to my way of thinking"_.

**3. It is not the industry standard**

The **[most popular languages in 2020](https://www.northeastern.edu/graduate/blog/most-popular-programming-languages/) are imperative, some more multiparadigmatic than others**, but none purely functional or logical. So, why bother? If it won't get me a better salary, is it really worth it?

## Reasons to learn a declarative language

**1. If you do better declarative, you do better imperative**

And for what I've seen and experienced, it doesn't go the other way around. **The declarative approach often needs some good practices that are not strictly necessary in the imperative**, in terms of what each block of code does and the consideration of all possible cases. 

When we keep our code clean of the little hacks we sometimes do, is easier to document, debug, maintain and scale it.

**2. Focus on the problem, write less code**

The first time I wrote a Python program after years of C++, I couldn't believe that hundreds of lines of code were reduced to a few dozen. Well, that was nothing compared to what I felt while learning Haskell, where those dozens of lines in Python could be written in less than ten.

Functional and logical programming take a lot from math, so definitions are short, expressive and powerful, but need a level of abstraction that requires time to apprehend.

**3. Make a difference in your CV**

As I said, the most popular languages are not declarative. But for this same reason, there are fewer developers (even thought their communities are growing). You will find Python, Java and Javascript developers under each stone, but having a different language in your belt tells that **you have devoted time to step out of the comfort zone** and you are familiar with different approaches.

## My personal experience - Why I choose Prolog

Prolog has multiple implementations, but I recommend SWI-Prolog, available for Windows, Linux and Mac. You can try it online in its official site (link below). It comes with a bunch of useful libraries and very good documentation.

**1. Soft learning curve**

My first experience with declarative programming, as I mentioned, was with Haskell. I really fell in love with the language, but there's a point where it got too abstract for me. I wish to retake it, but in the meanwhile, I discovered that Prolog is more intuitive in a lot of ways.

Also, there are great resources and documentation to learn Prolog from the very basics to a pretty decent level:

- http://www.learnprolognow.org/
- https://www.swi-prolog.org/

> *Edit*. I'm adding also a link to the [awesome-prolog](https://github.com/klaussinani/awesome-prolog#resources) repository, where a lot more of resources can be found.

**2. Native syntax for grammars**

I personally love working with grammars. I think they are useful and powerful. I have done a lot of personal work with tools like Flex and Bison, so when I discovered that Prolog has native support for them, via what it calls Definite Clause Grammars (DCG), I immediately fell for it. It may not be the perfect option to deal with highly complex semantics, but it sure does it for most common uses in text processing.

**3. Easy to embed and integrate**

If you want to use SWI-Prolog as some kind of inference module, a way to connect your applications with a knowledge base, instead of the main language, it has interfaces for several languages, like [C](https://www.swi-prolog.org/pldoc/man?section=foreign), [C++](https://www.swi-prolog.org/pldoc/doc_for?object=section(%27packages/pl2cpp.html%27)), [Java](https://www.swi-prolog.org/pldoc/doc_for?object=section(%27packages/jpl.html%27)) or [Python](https://pypi.org/project/pylog/).

