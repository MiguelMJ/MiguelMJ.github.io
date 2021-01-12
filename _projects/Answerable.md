---
layout: project
logo: /assets/img/Answerable/logo.svg
title: Answerable
slogan: Stack Overflow unanswered questions recomendation system.
github_repo: Answerable
documentation: https://github.com/MiguelMJ/Answerable/wiki
badges: # optional too
    - src: https://img.shields.io/badge/License-MIT-informational
      alt: License
    - src: https://img.shields.io/github/repo-size/MiguelMJ/Answerable
      alt: repo-size
    - src: https://img.shields.io/badge/python-3.8-informational
      alt: Python3.8
---

## Background

For me, contributing on Stack Overflow was a big step out of the comfort zone. There is already so much questions answered and so many experts there, that is not easy to find questions to answer. Anyways, I managed to make my contributions and get used to the flow of the site.

However, the activity is pretty constant, and it is easy to get lost in the amount of questions that you can't answer, be it for lack of knowledge, time, energy or question quality. For this reason, I thought it would be cool to automate the process of searching and filtering questions, based on my previous answers. So that is what Answerable is: a recommendation system on unanswered questions on Stack Overflow.

## A lot to learn

### Web scraping, APIs and RSS feeds

Thanks to this project I got the excuse to practise more web scraping. The problem was that the amount of traffic it generated was too high for me to feel comfortable, specially if I followed [rules of ethical web scraping](https://www.empiricaldata.org/dataladyblog/a-guide-to-ethical-web-scraping) (respecting servers and administrator is important). 

So the next step was to learn about the two tools that would replace scraping and optimize the information retrieval: the Stack Exchange API and RSS feeds. I discovered that the Stack Exchange community has a dedicated place for apps made with their API, so [I posted mine there](https://stackapps.com/questions/8805/placeholder-answerable-a-recomendator-of-unanswered-questions) and spent some time learning about the minimal calls I needed.

This way, the API is called only to get the data that the model will use. Then, the RSS feed returns the latest questions. With this approach, the bandwidth is optimized and the number of requests is highly reduced.

### Natural Language Processing and Machine Learning

Once we have all the information we need from the web, it is necessary to build a model to evaluate the answers of the user and make it classify the latest unanswered questions. The first version of this algorithm is pretty simple, making a study on the word frequency, pondered by the reputation associated to the answers and tags they appear in.

This approach has not given the best results yet, but surely something. To complete it, I will have to do some more research in NLP. I'm not sure if I will use Prolog, learn Pandas or the NLP python toolkit. Maybe an ensemble of all of them? We'll see.

### Some Python auxiliar tools

This is also the first project in which I use [Black](https://black.readthedocs.io/en/stable/) for style formatting and [Vulture](https://github.com/jendrikseipp/vulture) to clean unused code in Python. This way I get used to tools that optimize the process and produce faster results that improve the manual reviews.

_The project is not finished yet, and it surely will have place for modifications for a long time after a functional version is released_. 
