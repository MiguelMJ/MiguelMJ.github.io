---
layout: post
title: I made a recommendation system for Stack Overflow unanswered questions
date: 2021-01-15
links:
    Hashnode: https://blog.miguelmj.dev/i-made-a-recommendation-system-for-stack-overflow-unanswered-questions
    DEV.to: https://dev.to/miguelmj/i-made-a-recommendation-system-for-stack-overflow-unanswered-questions-280a
---
## Background

For me, contributing on Stack Overflow was a big step out of the comfort zone. There is already so much questions answered and so many experts there, that is not easy to find questions to answer. Anyways, I managed to make my contributions and got used to the flow of the site.

However, the activity is pretty constant, and it is easy to get lost in the amount of questions that you can’t answer, be it for lack of knowledge, time, energy or question quality. For this reason, I thought it would be cool to automate the process of searching and filtering questions, based on my previous answers. So that is what Answerable is: a recommendation system on unanswered questions on Stack Overflow.

## How it works

![preview](https://dev-to-uploads.s3.amazonaws.com/i/herwf9hrsro5b0pbfbpx.png)_Preview_

Answerable makes use of the [StackExchange API](https://api.stackexchange.com/) and StackOverflow RSS feeds to gather your answers on the site and use them to sort the new questions by similarity with the ones you've already answered. 

Optionally, it needs you to download certain information of your profile that can't be respectfully scraped, to improve the filtering of the feed.

## The documentation

You can find all the relevant information in the README and the wiki of the repository, along with the contributing guidelines.

## The code

You can find the repository in GitHub under the MIT License!
