---
layout: post
title: Writing a Conversational Interface Library - The design
date: 2020-08-19
author: Miguel MJ
tags: ['\n  -log', '\n  -project']
dev_url: https://dev.to/miguelmj/writing-a-conversational-interface-library-part-2-2iad
---
Before we properly start to code, we must define the requisites of the project to have a general understanding of what we have to implement and how we plan to do it.

### General description

The Conversational Interface Library will provide the user with a **Conversational User Interface** (CUI from now) class. A CUI must be able to load a dialogue flow specified by the user and answer their input according to it, modifying its internal state if it's necessary. It can be thought of as an automaton.

### Requisites

#### Input

When we think about user input, we have to always assume that we won't consider all the possibilities. Anyways, we want to consider as many as possible in the shortest specification we can.

The most powerful tool we have to do this are regular expressions. But, as regular expressions can sometimes be a little too complicated, we will think about creating a simpler format, easier for the user, that translates underneath to a regular expression.

#### Output

If we want a chatbot to feel as natural as possible, diversity of answers is a must. For this we will not only use a list of possible expressions to randomly choose from, but we will also group many different answers with little variations in the same expression.

Again, we can use regular expressions to generate strings. This is not their usual purpose, but there are libraries that allow as to do it.

#### Internal state

The internal state of the chatbot creates the context of the conversation, so for the same input, different output comes depending on what's been said earlier.

The most flexible and powerful way to contain and modify the internal state is to use an embedded scripting language.

#### Dialogue flow format

The dialogue flow then must associate input and state with a list of possible answers and state modifications. The ideal format would be one legible, without redundant information (except when it's for clarity) and customizable.

We will design a structure to contain the proper dialogue flow and use JSON to store it.

### Synopsis

From all we've said, the following specifications are extracted:

We will use

- regular expressions for input matching.

- regular expressions for output generation.

- optional simplification of regular expressions for the user.

- scripting language for internal state representation and modification.

- custom data structure to associate input, state and output.

- JSON to store such structure.



The first implementation I did in C++ (see [Part 1 of this series](https://dev.to/miguelmj/writing-my-conversational-interface-library-part-1-1jh3)) used its own version, built from scratch, of most of these features. But this time I'll find out what Java libraries I can use for the same purpose, because once you've reinvented the wheel in order to learn (which is a noble cause), you should use professionally built, tested and maintained wheels. That will reduce the effort you need to build, test and maintain your project.


