---
layout: post
title: Open sourcing a Python project? - Tools you should know about
date: 2021-04-05
author: Miguel MJ
tags: ['\n  -beginners', '\n  -python', '\n  -codequality']
dev_url: https://dev.to/miguelmj/open-sourcing-a-python-project-tools-you-should-know-about-8bc
---
At the moment I'm writing, I have no work experience, so my only way to practically learn about software development is via open source projects. Some time ago, I released the first version of Answerable, my first open source Python project.



Although **I had known Python for a long time, I had always used it for personal projects and college assignments**. For this reason, when I made my code open I had to ask questions, accept criticism and see what others did. Here I want to show you some things I learnt about.

## Style, PEP 8 and *Black*

When you make a project open source, you want to make the code accessible and clear. Anyone recognizes spaghetti code when they see it, no matter what their personal coding style is. You must cover some minimums here. 

Also, a core part of the Python philosophy is code readability. The first tenet in [the Zen of Python](https://www.python.org/dev/peps/pep-0020/) reads:

> Beautiful is better than ugly.

So, as I saw some references here and there about a document called [PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/), I started reading it to learn it and apply it to my code.

Soon, I was told that it was a waste of time when I could use a code formatter like [*Black*](https://black.readthedocs.io/en/stable/index.html). It is easy to learn and use and the improvement is immediately noticeable. You can correct your files on the spot or just print a diff with the changes without really applying them.

*Example 1. Formatting files directly*:
![black_example_2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rc8j9170aird32wn612z.png)

*Example 2. Printing the diff without change*:
![black_example_1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ipgpe1xp7lwp51ilbnlt.png) 

However, I don't think reading the PEP 8 is a waste of time. _Black_ may ignore some things that you still should pay attention to in order to have a clean style. Still, it is really good for general style revisions.



## Checking the code  with _pyflakes_ and _vulture_

Some errors in the code won't be noticed until execution, but they can be prevented with a meticulous review beforehand. The same happens with dead code that's been left after some changes. Pyflakes and Vulture can help you with that.

**Pyflakes** is a passive code checker; it parses the code without executing it, so it won't break anything. It points out variable conflicts and, in contrast to other checkers, it doesn't complain about code style (we have black for that and more). 

**Vulture** finds dead code: unused variables, functions and imports. But doesn't Pyflakes include this? Not exactly, because Pyflakes follows the principle of trying as hard as possible to avoid false positives. Vulture, on the other hand, adds to each warning a percentage of confidence. In Python is hard to tell when some function is unused, because it's a dynamic language, and in most cases, Pyflakes doesn't warn you about them.

*Output comparison*:
![pyflakes_vulture](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ea8njerkkkq62a3sag98.png)




## Tracking dependencies with *pipreqs*

Lastly, if you want your project to be used or modified by other programmers, it is better if they can install the dependencies directly, instead of installing them one by one, each one after a `module not found error`. For this purpose you have to **add a `requirements.txt` file to your project**.

You could do it manually (but that's not fun) or use `pip freeze`, but that writes all your installed packages, many more than necessary. Instead, using **pipreqs**, a requirements.txt file is generated with only the packages that your project uses.

*Pipreqs example:*
![pipreqs_example](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rmiizodri4tibqrhaq32.png)

Now if someone clones your project, they can just use `pip install -r requirements.txt` and the dependencies will be installed.

## Conclusion

I hope you find some of these as useful as I did. I'm pretty sure there are other great tools out there to use in Python projects. Do you know any? Please share them in the comments!
