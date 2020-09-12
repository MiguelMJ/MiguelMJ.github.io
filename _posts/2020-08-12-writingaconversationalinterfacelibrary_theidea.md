---
layout: post
title: Writing a Conversational Interface Library - The idea
date: 2020-08-12
author: Miguel MJ
tags: ['\n  -project', '\n  -log']
dev_url: https://dev.to/miguelmj/writing-my-conversational-interface-library-part-1-1jh3
---
One of the things that caught my attention before I started studying Computer Science were **chatbots**. I'd always loved the idea of speaking to machines, but the quality of real chatbots obviously wouldn't be up the incredible AIs of sci-fi movies.



When I learnt the two main approaches to chatbot-like applications used today, machine learning based and rule based, I knew I had the spirit but lacked the skills to follow the first one. Therefore, I did my research on the second one and found AIML.



Yet, as time passed, I started to become more and more interested in developing my own tool, rather than the chatbot itself. I wanted to make something at least as powerful as AIML and hopefully better.



After a year or two, between studies and other projects, I managed to finish the first version of TASCHE (link below), a library to design dialogue flows in JSON, a custom format for the patterns and a custom pseudolanguage to modify its internal state. It was not as great as my first-year-in-uni self would dream, but it worked and was definitely set on the right path.



As I was still learning during the process, it suffered a lot of transformations. It's enough to say that the first pattern parser was written from scratch in several thousand lines of code, before being replaced by a more legible Flex + Bison version. I wrote it in C++ because its my main language and I needed to focus on the structures and algorithms. Now, five years after the first draft, I've chosen Java to rewrite it and try to improve it in the process.



I'll keep this series to explain the internals of TASCHE and its evolution. I think my first-year-in-uni self will enjoy it.






