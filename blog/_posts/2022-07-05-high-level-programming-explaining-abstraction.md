---
title: High level programming
subtitle: Explaining abstraction
date: 2022-07-05
layout: post
---
When designing our programs, we make use of abstraction while also providing it. In this post I want to analyze the concept of abstraction in the context of programming and software development.

What are "high level" and "low level" languages? When we talk about level, we are not talking about performance or power, but about the _level of abstraction_. Let's see what this means.

## Abstraction as thinking about "what" and not "how"

**Anything that provides an interface to simplify a complex structure or algorithm behind it** provides a form of abstraction. We find this constantly while programming, using functions, subroutines, APIs, libraries...

The same algorithm can be expressed in **different levels of abstraction**:

| Level of abstraction | Algorithm |
|----------------------|-----------|
| Highest | 1. Prepare a cup of coffee |
| High | 1. Boil some water.<br>2. Place the filter with coffee over a cup.<br>3. Pour slowly the water into the filter. |
| Low | 1. Fill a cup of water.<br>2. Pour it into a pot.<br>3. Heat the pot until the water boils.<br>4. Place a coffee filter over a cup.<br>5. Put a spoon of coffee in the filter.<br>6. Pour slowly the water into the filter. |
| Very low | Steps that could include how to traverse your kitchen, how to look for each tool in your drawers and even the movements of your wrist and fingers for each task. |

The higher the level, the more information is taken for granted. The lower, less complexity is hidden.

Why is it useful to understand this?

- **For design**. When you define an algorithm to solve a problem, it's usually better to start with a high-level approach, and then break each step down into smaller steps, solving each one at a time (this is related to [dynamic programming](https://stackoverflow.blog/2022/01/31/the-complete-beginners-guide-to-dynamic-programming/)). Also, this top-down design process usually results in more modular code, which is easier to work with to a certain extent for larger programs.
- **For documentation**. A common beginner mistake is to write low level documentation, when a high level one would provide more useful information. If you have written a piece of code I'm going to use, just let me know how to use it. Give me low level information in case I'm going to review or modify the code, or if I need to understand technical details for any reason.
- **For optimization**. You might have heard that low level languages run faster than high level languages. This is only half true. Every high level language performs behind-the-scenes optimizations that a low level program should match to be as fast. One of my favorite quotes, whose source I don't remember, is: _"Badly written C is slower than Python"_. So don't assume that just because something is low level is faster than a high level alternative, unless you understand the objective complexity of both cases.

## Abstraction as generalization of specific cases

**Any process that operates with independence from the nature of one or more of its elements** provides a form of abstraction.

A structure or algorithm may have more specific instances, and be, at the same time, a specific instance of a more general case:

Data structures, for example, are identified at high level by the insertion, access and deletion rules, while in the low level are identified by the type and arrangement of their values.

| Level of abstraction | Structure |
|---|---|
| General | Set of values identified by a key of any type |
| Less general | Set of values identified by any number|
| Specific | A list of values |
| Very specific | A linked list of strings | 

The abstraction level of an algorithm depends on the abstraction level of the structures involved and how much you can determine the result for any specific input.

| Level of abstraction | Algorithm |
|---|---|
| General | Traverse any iterable structure and apply an operation to its values |
| Less general | Iterate a list and apply an operation to its values |
| Specific | Iterate a list of numbers and apply an operation to its values |
| Very Specific | Iterate a list of numbers and duplicate each value |

Why is it useful to understand this?

- **Using abstractions already present in programming languages**. Most high level languages offer tools like templates, high order functions, interfaces, etc, that usually spare you a lot of work, when you are able to identify the best opportunities to use them.
- **Reusing logic to improve your code**. Taking recurrent logic in a program and making it abstract results in shorter, more flexible and scalable code.

## Good practices and conclusion

Now, you must be careful. Too abstract code might be sometimes more difficult to read and difficult to optimize, because there exist more dependencies and procedures tend to take more parameters. The complete opposite is also true: code with zero abstraction is going to be a pain in the neck to write, review or maintain. 

Always try to find a balance between ingenious and maintainable solutions.
