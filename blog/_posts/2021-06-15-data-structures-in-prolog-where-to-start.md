---
title: Data structures in Prolog
subtitle: Where to start
date: 2021-06-15
layout: post
highlight: true
---

Defining the structures that represent the information of your program should be one of the first steps for its design. For that same reason, after learning the basics of a language, the immediate step should be learning how to represent and use the most common data structures.

> The difference between a bad programmer and a good one is whether he considers his code or his data structures more important.
Linus Torvalds

***

This post doesn't aim to cover the basics of Prolog, so it's understood that you are familiar with terms, variables, atoms, facts and predicates. If that's not the case and you want to learn, go check the [awesome-prolog](https://github.com/klaussinani/awesome-prolog#resources) repository, where you can find great resources for that.

## Purpose of this post

As I said in my post about algebra in Python (link at the end), we should use built-in functionalities of high-level languages when possible. This makes our code more legible, idiomatic and, usually, faster, because it's probable that the underlying logic is better tested than ours.

When I started to plan this post, I wanted to make a comprehensive guide on different data structures in Prolog. Nonetheless, researching on built-in structures, I found out that:

- There are small differences between implementations.
- There is better content about this topic out there, that takes into account much more things that I did initially.

So instead of making a huge post of a series just by rephrasing all my references, I decided to gather the resources here. It took me some time to find these, so maybe I can spare some time to other people looking for the same information.

I have split the post in two parts:

1. A collection of references for general and specific data structures. 
2. Some considerations for writing your own data structures.

## Links of interest for existing data-structures

Right now I'm working with SWI-Prolog, so part of the links will be to their modules, which may be different in other implementations. However, I might come back to add links from other implementations if I get to work with them.

### Lists

- [The Power of prolog - Prolog Data Structures - Lists](https://www.metalevel.at/prolog/data#list)
- [Learn Prolog Now! - Chapter 4. Lists](https://www.let.rug.nl/bos/lpn//lpnpage.php?pagetype=html&pageid=lpn-htmlch4)
- [Learn Prolog Now! - Chapter 6. More Lists](https://www.let.rug.nl/bos/lpn//lpnpage.php?pagetype=html&pageid=lpn-htmlch6)
- [The SWI-Prolog library - library(lists): List manipulation](https://eu.swi-prolog.org/pldoc/man?section=lists)

### Sets

- [The SWI-Prolog library - library(lists): List manipulation](https://eu.swi-prolog.org/pldoc/man?section=lists#is_set/1) (Second half)
- [The SWI-Prolog library - library(ordsets): Ordered st manipulation](https://eu.swi-prolog.org/pldoc/man?section=ordsets)

### Key-value pairs & Association lists

- [The Power of prolog - Prolog Data Structures - Pairs](https://www.metalevel.at/prolog/data#pair)
- [The Power of prolog - Prolog Data Structures - Association lists](https://www.metalevel.at/prolog/data#assoc)
- [SWI-Prolog library - library(pairs): Operations on key-value lists](https://eu.swi-prolog.org/pldoc/man?section=pairs)
- [SWI-Prolog library - library(assoc): Association lists](https://eu.swi-prolog.org/pldoc/man?section=assoc)

### Dictionaries

- [Dicts: structures with named arguments](https://www.swi-prolog.org/pldoc/man?section=bidicts)
- [The SWI-Prolog library - library(dicts): Dict utilities](https://eu.swi-prolog.org/pldoc/man?section=dicts)
- [Question about dictionaries and their nuances](https://swi-prolog.discourse.group/t/question-about-dictionaries-and-their-nuances/1045/2)

### Matrices

- [External package for SWI-Prolog: matrices.pl](https://github.com/friguzzi/matrix) | [Documentation](https://www.swi-prolog.org/pack/file_details/matrix/prolog/matrix.pl)

## Data structures and logic programming. Describe relations, not operations

Before starting, it's important to note something. We are used to defining data structures by the relationship of the data they contain and the operations you can perform on them. However, in Prolog, all of this might be defined all at once in many cases.

**The same predicate can be used for different tasks**, because the same definition explains many behaviors. After all, we are talking about a language where you can use `append` to split a list:

```prolog
% Append L1 and L2 into L3
?- L1 = [1,3,5], L2 = [2,4,6], append(L1,L2,L3).
L1 = [1, 3, 5],
L2 = [2, 4, 6],
L3 = [1, 3, 5, 2, 4, 6].

% Remove L1 from the beginning of L3 to get L2
?- L1 = [1,3,5], L3 = [1,3,5,2,4,6], append(L1,L2,L3).
L1 = [1, 3, 5],
L3 = [1, 3, 5, 2, 4, 6],
L2 = [2, 4, 6].
```

The most straightforward example to illustrate this is with a custom data structure is a **stack**. Instead of implementing the `push` and `pop` operations, we are just going to define one predicate that describe both operations at the same time.

```prolog
% push_pop(Stack1, Element, Stack2)
push_pop([X|S], X, S).

% Use it to pop
?- push_pop([10,20,30], X, S).
X = 10
S = [20, 30]

% Use it to push
?- push_pop(S, 0, [10, 20, 30]).
S = [0, 10, 20, 30]
```

Here are some interesting topics to also have in mind for your design:
- [Logical purity](https://www.metalevel.at/prolog/purity), to prevent side effects, facilitate reasoning about your own program and enable automatic optimizations.
- [Clean vs Defaulty representations](https://www.metalevel.at/prolog/data#clean) to optimize choice points out and keep semantic coherence.

## Conclusion

If you've got this far, you must be a Prolog beginner, as I am. I hope you found this useful and if you have more Prolog data structures related resources, feel free to put the link in the comments and I will add it to the list.

