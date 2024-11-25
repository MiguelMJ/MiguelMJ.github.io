---
layout: post
title: JavaScript is not an untyped language
date: 2022-06-24
links:
    Hashnode: https://miguelmj.hashnode.dev/javascript-is-not-an-untyped-language
    DEV.to: https://dev.to/miguelmj/javascript-is-not-an-untyped-language-1jkg
---
## JavaScript's popularity

At the time of writing this post (Jun 2022), JavaScript **is #3 in the [PYPL](https://pypl.github.io/PYPL.html) index**, only beaten by Java and Python in popularity. In the [latest Stack Overflow Developer survey](https://survey.stackoverflow.co/2022/#most-popular-technologies-language), it came out as **the most used language for the tenth year in a row**. Being the main language for programming web applications in a connected world, it's not that of a surprise that programmers of all levels of experience work with it, both for learning and professionally.

But JavaScript is a peculiar language. Designed for running on web browsers, some people wanted to use it out of them so much that they even created NodeJS for that. JavaScript has contributed to create things like AJAX and JSON (they liked greek myths) that would still be used even if another scripting language appeared someday to replace it, something that won't happen soon. So it's clear that people love it.

Love it? When you listen and read about it, you'll quickly notice that people tend to have very strong opinions (maybe it's a common trait in developers) on this language. They either love it or hate it. And a lot of people have an opinion, just because **depending on what part of the industry you work, it's just inevitable to use it daily**. Yet, it is so error prone and unsafe, **unless you have really consolidated good practices**, that it's unbelievable that it's still a standard.

## Tech-influencers

What calls my attention the most is the fact that **lots beginners are so centered around it**. In fact, the same phenomenon goes on with Python. Their high level, dynamic nature, makes them easy to start with. Dictionaries are primitive types, functions are first class citizens... they are just so flexible! And it's so easy to write listicles about JavaScript, 30 secs tutorials or make 3 slides explaining how great it is compared to other languages to get traffic on your posts, videos, etc.

Some tech-influencers even build their brands specifically on this kind of JavaScript content. The damage that these tech-influencers do in general is not the matter of this post, but there's something very specific that's wrong and that I've read a lot that I would like to explain.

## Is JavaScript an untyped language?

If there's something new programmers hate is error messages. I guess that's why I've seen listed as one of its advantages over other languages that **JavaScript produces no type errors because it's an untyped language**.

***This is just wrong***

Yes, JavaScript raises less errors than other languages in the same context. Is this good? If the infamous `"ba" + +"a" + "a" == "baNaNa"` is not a red flag for you... Anyways, that's not the matter of this post either. The point I really want to make is: ***JavaScript is a typed language***.

There was a [discussion on Stack Overflow](https://stackoverflow.com/questions/964910/is-javascript-an-untyped-language) in 2015 on this topic (and I'm sure in many other sites over the years) where the top answer summarizes the problem very well. The key is what you mean as _"untyped"_. Well, Brendan Eich himself used this term to describe JavaScript, meaning that it's not statically typed. However, one thing lots of programmers missed is that **even he pointed out that the term is used differently in academia and that JavaScript, in fact, had typed values**.

It's important for professionals to use standard terminology, and like it or not, _"untyped"_ is not appropiate to describe a non statically typed language. If _"untyped"_ already has another use: _a programming language with no types_; and what you are saying also has an unambiguous term associated: _"dynamically typed"_, then the more **clear and distinct** option should be preferred.

Let's consider the following points:
- A programming language with types is a typed language. No matter if statically-typed or dynamically-typed: it is typed.
- Types impose semantic restrictions: **type errors occur**.
- JavaScript might perform almost every possible casting (this means weakly typed) to prevent this errors, but the can still raise. Examples:
    - `null[0]`
    - `undefined[0]`
    - `null(1)`
    - `undefined(1)`
    - `1(1)`

All of these operations could silence their errors with more castings, like turning `null` and `undefined` into empty dictionaries, or any non-function value to a bottom function that always returns a nullish value. But even for JavaScript that would be too much of a bad decision. Because type errors are not there to annoy you, but to help you. Type safety is a good thing.

## Conclusion

JavaScript is a typed language that can raise type errors and the fact that a lot of implicit castings may be happening all the time is just a feature of the language that demands extra attention from the programmer.

Let me know your thoughts on the comments!

***

## EDIT

There have already been several people asking the same things in the comments so I'm going to write here the answers for anyone going to ask the same things again:
- ***Where have you read that JavaScript is untyped?***. Scroll up a bit. **As I say in the post**, Brendan Eich (creator of JS) uses that word to describe JS, in the SO discussion linked above there people saying the same thing, tech-influencers I don't want to promote do so too and finally some users in the comment section. 
- ***There are no untyped languages, that makes no sense***. Using the description of untyped languages as languages without a type system (a definition used by authors like L. Cardelli or R. Harper **very different from dynamically or weakly typed**), untyped languages do exist.
    - A lot of Turing complete formal languages are untyped, from the Turing machines themselves to cellular automata.
    - Assembly languages are untyped. Some may provide syntax sugar to work with primitive typed-like values, but there is not a type system that imposes restrictions on operations based on types (in most of them).
    - Some shell languages are untyped. The type-like restrictions come from subprocesses, not from a native type system.
    - Pure Prolog is untyped. Without the IO stream entities, everything is a Horn clause that can be evaluated to true or false, without type restrictions.
    - Some esoteric languages are untyped. Brainf*ck being the most popular, lots of languages, usually minimalistic, don't have a type system.

    Yes, I know typed languages are more present in the industry (except for assembly and shell languages), but that doesn't make the distinction pointless. Remember the software industry came way much later than computer science itself and both still develop in separate streams.
- ***That's not how type systems work***. If you read the thread in the comments with @DarkWiiPlayer, you'll find that there doesn't seem to be a consensus on whether types are syntactic or semantic information, so depending on the sources you use, all this will make sense or not. The paradigm I'm adjusting to is that types are semantic information, not syntactic. It's a complex topic so instead of elaborating further I'll link some references.
    - L. Cardelli & P. Wegner (1985) _On Understanding Types, Data Abstraction, and Polymorphism_ ([PDF](http://lucacardelli.name/Papers/OnUnderstanding.A4.pdf))
    - R. Harper (2016) _Practical Foundations for Programming Languages_ (2nd ed.) ([PDF](http://www.cs.cmu.edu/~rwh/pfpl/2nded.pdf))
    - _Is type-checking "syntactic" or "semantic"?_ Computer Science Stack Exchange ([link](https://cs.stackexchange.com/questions/119002/is-type-checking-syntactic-or-semantic))

    To be fair with the opposite paradigm, here's their reference too.
    - H. Geuvers (2019) _Introduction to type theory_ ([PDF](https://www.cs.ru.nl/~herman/onderwijs/provingwithCA/paper-lncs.pdf))


Thank you to all those who have participated in the comments!
