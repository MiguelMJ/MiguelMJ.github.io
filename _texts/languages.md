---
title: On programming languages
subtitle: Thoughts and experience with PLs
description: Thoughts and experience with PLs
layout: main
category: index
permalink: /reflections/on-programming-languages
position: 1
---
# On programming languages

{% capture text %}

As programming languages theory is one of my main interests, I try to learn as much as I can about different languages and complete projects with them, to better understand their strengths and weaknesses. This way I intend to substantiate my own opinion on the design of programming languages. In this section I collect my experiences and opinions with different languages.

## Bash
            
I started writing Bash scripts when I switched to Linux during university. My feelings towards Bash are complicated. In one hand, it is so convenient to work directly with processes, executables, files, output redirection... It's a shell language after all, and for some reason it's the default language in most common Linux consoles. However, its syntax feels hacky as hell. I have read one million times when to use <code>$*</code>, <code>$@</code>, <code>"$*"</code> and <code>"$@"</code> but I always need to check again. The same goes with <code><()</code> and <code><<<()</code>. Also, variable expansion is super useful but only with a cheatsheet at hand. Writing complex boolean conditions might become also confusing, as well as trying to work with arrays and dictionaries. 
                
In my opinion, Bash is not meant for use above certain level of complexity. The main use I give bash now is for creating master scripts (a purpose I used to give Makefile) but little else. A permanent to-do for me is learn a modern shell language that doesn't have an obscure syntax and facilitates the use of data structures.
## C++
This was the first programming language I ever learned, during the single year I coursed Electronics Systems Engineering, before changing to Computer Science. I'm convinced it helped me to learn any other language afterwards, because most programming languages feel like abstractions on top of it. I know I'm obviously biased, but today I still recommend it as a first language for those with long term generalist goals.
As it was my first language and I didn't know much about third party frameworks/libraries when I started, I reinveted several wheels with it. My craziest programs have been written in C++. For example, I spent my first two years writing what I later discovered was a regular expression engine (both for parsing and generating strings). I didn't even know how to use the standard libraries so I implemented my own data structures with the basic knowledge I had on pointers and a recently discovered stackoverflow Q&A page. The unholy main file was 3000+ lines long and I loved it with all my heart. Years later, I refactored it into my <a href="https://github.com/miguelmj/tasche">Text Adventure and Simple CHatbot Engine</a>. I was also obsessed trying to work with graphics (usual thing with newbies) so I did all kind of weird experiments in the console before discovering <a href="https://www.sfml-dev.org/">SFML</a>. Unexpectedly, my implementation of a canvas in the console was included years later in one of my first open source contributions to the <a href="https://github.com/JustWhit3/osmanip">osmanip</a> library. After discovering SFML, I built some basic games like snake or chess, the latter having a multiplayer option over LAN. I'm not going to lie: historicaly, the quality the code I've written is inversally proportional to the fun I've had writing it, and I can say I did have a lot of fun learning about computers and software with C++.
My library for SFML, <a href="https://github.com/MiguelMJ/Candle">Candle</a>, is my most starred repository on GitHub, so that's an incentive to keep working with this language, even though I have very little spare time to maintain it. It was part of a larger project to build a <a href="https://github.com/MiguelMJ/Velero-Engine">full game engine</a> that I started during the pandemic. I can confidently said that all the (unfinished) work I did on it enabled me to learn quickly Unity and Godot afterwards. Come to think of it, C++ has always been the language I use to learn things...
        
***
To say something about the language itself, I actually feel that I could be hardly recognised as a C++ programmer nowadays. I actually learned just C++03 with a touch of C++11 and I haven't catched up with it ever since. Modern features introduced in C++14, C++17 or C++20 are alien to me. So read me with that on mind.
Specifically about the syntax I have not much to say. Given that C-like languages are everywhere, its syntax is like water to most of us so I can't really point out significant strenghts or weaknesses. I will, however, comment on some semantic aspects.
Currently, C++ is considered a memory insecure language (and it is) and other more recent languages, especially Rust, are presented as alternatives. In my opinion (already established as biased), I think security is an important layer desirable in most contexts, but not something unachievable in C++ and certainly not something required while learning. Being familiar with an unsafe tool is also a (good?) way to adopt better practices and to get used to consider side effects even before writing code.
Another thing I'd like to say it's about it's OOP approach. I worked for years with Java for university subjects and professionally with Kotlin for some time now, but I have never liked the differentiation between interfaces and abstract classes these languages make. I feel like it's only purpose is to allow multiple interface implementation while preventing multiple class inheritance. Of course, I'm aware of the diamond problem, but C++ allows you to call a function from a specific parent, allowing as a result to solve the problem with a single one-line function override. Anyway, that might be the only advantage I personally find in C++ OOP. Polymorphy only working naturally on pointers forces you to work with them in contexts where otherwise wouldn't be necessary and that alone sets a very, very low bar for a language to be more suited for every day OOP. 
        
## GDScript

WIP

## Java

WIP

## JavaScript

WIP

## Kotlin

WIP

## Lua

WIP

## Matlab / Octave

WIP

## Prolog

WIP

## Python

WIP

## R

WIP

{% endcapture %}

{% assign texthtml = text | markdownify %}

<nav role="doc-index" id="toc" class="card">
    {% include toc.html html=texthtml h_min=2 %}
</nav>

{{ texthtml }}