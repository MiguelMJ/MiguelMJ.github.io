---
layout: post
title: Programming as a conversation
subtitle: How the communicative scheme is also applied in the written code itself
links:
    Hashnode: https://miguelmj.hashnode.dev/programming-as-a-conversation
    DEV.to: https://dev.to/miguelmj/programming-as-a-conversation-how-the-communicative-scheme-is-also-applied-in-the-written-code-itself-5378
---
Coding conventions, documentation practices and nomenclature styles are commonly subject of strong opinions among developers. In my case, I really thought for years that the best way to write software had to exist, even if it was not mine. And, surely, there are objective criteria that make code better, from the best use of idioms to the readability-performance tradeoffs. However, I've come to think that **understanding code as a conversation where subjectivity takes a role** might be the most valuable approach to write software, rather than one that assumes universal metrics.

## Introduction - Programming as talking to a machine

When I was learning to program, my university teachers used to present programming as a way to communicate with a computer. Compilers are translators between high level programming languages (closer to human languages) and machine language, binary encoded in metal circuits; therefore, **to program is to talk with a computer**. Obviously, this definition is not wrong, but in the software development industry context, it is clearly reductionist, as it ignores many other factors involved in development. However, this is precisely the approach that most academics I've worked with take, deliberately or not.

## Academy and industry

The reason for this difference between industry and academy is the fundamental understanding of what programming is and, as a consequence, what life cycle of software is.

**In the academy, programming is a tool to build systems that model a theoretical problem, that solve particular tasks, that embody specific demonstrations or proofs**. Projects evolve from simple scripts to bigger systems, usually written collaboratively between professors, doctoral candidates and inexperienced, unsupervised, recently graduated students, neither of whom uses to care much about long term maintainability. This, along with a general lack of supervision, results in partial or absolute absence of tests, absence of style conventions, inconsistent coupling levels across the architecture and other usually considered bad consequences.

On the other hand, **industry software development takes programming as a tool to build products that need to meet requisites set by clients and changing markets**. Projects might last for many years and will be developed, extended, refactored and maintained by very different developers over the course of time. In the industry, this software is alive and evolving. Therefore, its architecture must be able to adapt and grow by the hand of whole teams that may also change over time.

For this reason, projects that come from the academy to find a place in the market will eventually face a complete readjustment if they want to survive. However, not all software is meant to end up in the market. Not all projects are born to live long lives, to be built collaboratively or to evolve at some point. If a piece of software works and no one is meant to ever touch it again, apart from maybe the original creator, then complex architectures, coding conventions and best-practices can be an unnecessary overhead. **It is very important to identify the expected cycle of life for a program**, to be objective about how it will need to be maintained.

## Programming as a dialogue

The first time I was told my code sucked was in an issue on one of my open source projects, where the developer in question told me, with no offense intended, that the unreadable code made it hard to contribute. I always tried to make my code readable, how could someone not understand it? So I went to the mentioned piece of code and, what a shame, it was ten times more unreadable than I remembered: obscure variable names, deep levels of nesting in control structures, walls of code without either comments or subroutine division... Basically, they were right.

I didn't take time to improve it. In the end, it's an open source library used by very few people and contributed by even less, and I had better things to do. But a year or two later, I landed a new job and my new co-worker told me, during my first code review: ***"You are not used to writing code in a team, right?".*** Since he had seen I was willing to learn, he had a very good attitude towards me and showed me the clean code practices that the team followed. However, that particular question stuck with me. It was not my first job, but it was, indeed, the first time I was going to write code, on which my income would depend, that other people would be working with.

I came to the realization that, when I wrote code without supervision (for personal projects or in a solo team) my inner discourse would go on like a **monologue**. As I internalized at university, I was just talking to the computer. After that code review and more that came after, I was required to have an inner discourse that worked as a **dialogue**. I had to talk to the machine but also to my teammates. But, how is that done through code?

## Langue vs Parole

In linguistics, there's a difference between *langue* and *parole*. The first one is the common code use to communicate with others (the language), and the second one is the particular way it's used by an individual. For this difference, if you happen to be in the bus and listen to a conversation between two close friends, you might hear a lot of things that you don't understand, even though they are speaking the same language as you. Not only because you may lack context, but because (oversimplifying) their specific use of language might be alien to you. The same happens with code.

If you alone are communicating with the computer, there is no problem to write code as a monologue. As far as I know, this is pretty frequent, for example, in indie game development. Some great indie games, like Undertale, are said to have terrible codebases. Given that many indie developers learn to code during the development of the game itself, it is not something strange. But, in the end, it doesn't matter at all. **The game is finished, machines run it and people play it.** **There would be absolutely no point in rewriting the game only for it to follow industry best-practices**. The same happens with *some* university projects. Once you have processed a dataset and extracted what you needed, or once you have tested the algorithm you were developing, a new architecture won't make any improvement on your desired results.

![Diagram of a developer, software and a computer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r1cx0whguo9hafnxy2pt.png)

However, if you work in a team and follow this "monologue approach", you will end up with **serious** problems. And when I say team, I also mean open source contributors or future maintainers for solo projects. Interpret it in a broad sense. The codebase receives input from several channels that, the same way as in the bus example, exclude others from the conversation. **Your teammates will need to understand the language and your use of it to comprehend the code**. This will be aggravated with each new contributor that joins the project.

![Diagram of a team of developers, software and a computer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0rfppmwz5rwy7q0vsq6c.png)

To avoid that, conventions are needed. Because, let's be real: even the most self-explanatory code can reach a point of complexity that require outside explanations, at the very least for inexperienced members of the team. Every developer that says otherwise is just assuming a level of experience and knowledge of industry standards that not everybody (starting with me) has reached yet. So, the conventions must include design patterns, code styling, nomenclature and even testing philosophy. **Choosing the conventions that adjust the best to both the project requirements and the used technologies, and effectively communicating them to the other developers (usually via documentation or onboarding processes), can make the definitive difference for a project in the long term.**

![Diagram of a team of developers, conventions, software and a computer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n9j3vcm47nbro21ahk9k.png)

Needless to say, it is not all about choosing the perfect conventions, that, to start with, don't exist. Unclear or changing requirements, too simple or too complex architectures, and many other factors are also determinants of this long term maintainability. Again, software development is a complex activity with many factors involved.

## Conclusion - Ensuring conventions

As in any form of communication, the code conventions chosen for a team and a project may be sometimes interpreted in different ways or with varying levels of rigor by each programmer. Subjectivity is like that. Therefore, **code reviews become an inseparable part of the said conventions' proper application**. What is legible for you may (and will) not be legible for others. So having more eyes on the code is a good way to make it more accessible. Both giving and receiving feedback on written code must be handled with humanity and an open mind.