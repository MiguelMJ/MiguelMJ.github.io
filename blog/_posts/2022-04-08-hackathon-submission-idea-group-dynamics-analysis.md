---
title: "Idea: Group dynamics analysis"
subtitle: Hackathon submission
date: 2022-04-08
layout: post
links:
    Hashnode: https://miguelmj.hashnode.dev/hackathon-submission-idea-group-dynamics-analysis
    DEV.to: https://dev.to/miguelmj/hackathon-submission-idea-group-dynamics-analysis-13dd
---

### Introduction

Well, this is my third submission for this hackathon. I guess Automatic Speech Recognition (ASR) really inspired me. This time I'm participating in the **Innovative Ideas** challenge because I don't know if I'll have time to program anything else and I prefer just to write.

Natural Language Processing (NLP) and conversational interfaces are one of my favorite topics in technology. That's why I've tried to find interesting use cases for ASR, more than just plain transcription functionalities, which is just a little part of what Deepgram provides. I was surprised to discover how easily you could get other useful data like timing (timestamps of start and end of words) and source recognition (differentiate speakers). We know there's a lot of useful information in speech and I think that's the main reason I've felt so inspired. I'll write more in depth about my thought process behind each submission in the next and final post of this series.

### My Deepgram Use-Case

For a long time, I've been interested in **group dynamics**. We all know from experience that each person feels more motivated to participate in different groups or to talk about certain topics. I think it's important to observe the behavior of each speaker and their reactions in different situations in order to create more comfortable and productive conversations in the future.

So one possible use case for Deepgram and ASR technology could be to analyze recordings of meetings to extract **useful information about the dynamics of a group**.

_What topic makes the quiet one speak more? What kind of words prevent interruptions? What topics are more polemic to certain people?_

This kind of analysis would be useful in cases like work meetings, community moderation and even psychology experiments.

### Dive into Details
#### Technical approach
##### Get the data
- First of all, the program would use Deepgram to **get the punctuated and diarized transcription**, with additional information about the utterances.

##### Enrich the data
- From that information, it would **reconstruct the conversation**, separating the intervention of each speaker, counting the number of utterances and also the time separating each one. It might be interesting also to mark profanity.
- Now we could find anomalies in the time separating interventions to **detect possible interruptions** or long silences.
- Then, it might be necessary to make several runs of LDA (Latent Dirichlet Distribution) to **find the topics** treated in the conversation, when they change, who brings them, etc.
- Similarly, it would run several **sentiment analyses** by topic, by person, by intervention and of course a general one.

##### Summarize and present the data
- With some probabilistic analysis, it could be possible to estimate **correlation** with interruptions, silences, topics, topic changes, people, sentiments, etc. _I would propose either a Bayesian network or a Rule discovery algorithm, like Apriori_.
- Finally, the program would make a **summary of the interventions of each person**. Some possible data to extract would be:
    - Time spent speaking
    - Topics where they intervene more/less.
    - Who speaks usually before or after them.
    - Sentiment correlation with topics and other people.
    - Most repeated words.
    - Exceptional words. By this I mean relevant words that nobody else said or that has little relation with the topics of the conversation... You never know if you'll learn something important about that speaker.

#### Application

One of the first things I realized was that this wouldn't be of much use in controlled environments, like interviews. The interest comes from **natural dynamics that arise from the interaction between individuals** when discussing everyday topics.

So one clear context where this could be useful would be work meetings, that can be recorded and analyzed. However, I feel like recording conversations in other settings is somewhat intrusive, so I can't actually propose specific, additional use cases. As I said before, maybe use it with event recordings for community moderation and somehow in psychology experiments... **I'm interested in what's your opinion and what case can you come up with**.

_Edit:_ I've been told that there's an interesting use case, related to studying cultural differences. There are cultures where an interruption meant to express agreement is considered polite, while in others the convention is to leave seconds of silence between interventions. I guess that another application would be to study **group dynamics in multicultural groups**. 

### Conclusion

I've had real fun thinking and working on this hackathon, so thanks a lot to Deepgram and DEV for organizing it. As I said at the beginning, I've felt really inspired and I'm sure I'll work further with the projects born from it. I'll soon post the last post of this series, 
<!-- [Note]: # (Any thoughts or takeaways about what you've learned from participating in Deepgram Hackathon “Innovative Ideas” challenge can go here! If you're planning on writing a series of posts for the Hackathon, consider teasing your next post.) -->


