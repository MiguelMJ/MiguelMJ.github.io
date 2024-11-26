---
title: Interactive conversation scripts for language learning
subtitle: Hackathon submission
date: 2022-04-03
layout: post
links:
    Hashnode: https://miguelmj.hashnode.dev/hackathon-submission-interactive-conversation-scripts-for-language-learning
    DEV.to: https://dev.to/miguelmj/hackathon-submission-interactive-conversation-scripts-for-language-learning-110c
---

## Overview of My Submission
My second submission consists on a tool designed for languages teachers and students. Audios with recorded conversations are a common and good resource in language lessons, so I thought it would be useful not only to have a transcription to read while you listen, but also make them interactive to show phrase by phrase translations and to quickly navigate the audio to listen again certain part of the conversation.

## Submission Category
Accessibility Advocates
Wacky Wildcards

## Link to Code on GitHub

https://github.com/MiguelMJ/Scripter

## Additional Resources / Info

This time I reused most of the code from my previous submission. In that one I forgot to tell a bit of background, so as most of the code is the same, I will do it here.

In spite of using Python for the program, I didn't want to use the Deepgram SDK. I know other participants have done the same; in my case, it's just because I'm used to making HTTP requests for lots of things, so I chose not to add more dependencies to the application. I felt that the Deepgram API is accesible enough for me.

I've once more used another API: LibreTranslate. This time, the difference is that LibreTranslate is a open source API, so there are different available mirrors, and you can even set up one yourself, so I allowed the user to specify which one to use with a `-H|--host` parameter and made a quick guide on it on the README.

I'm not actually a webdev person, so the resultant HTML file might not be very polished, but I thought is more than enough for a prototype. I learned to use the `<audio>` element of HTML5 and manipulate it via JS, which is nice. Thanks to it and the rich information returned by the Deepgram API, the interactive scripts have the following features:

- The audio is embedded in the HTML file, so it can be played directly from there (as long as the path of the source audio doesn't change).
- Each sentence of the audio is printed in a different color, according to who is the speaker.
- If you hover over a sentence, the translation to your language (if supported) appears.
- If you click on a sentence, the audio plays only the sentence you clicked on, making it more easy to replay specific parts of the audio.

Here's a little demonstration on this features.

https://youtu.be/RYa6a9MX8-U

I recorded a short, sample conversation with my sister, who also provided the voice recorder. Some notes:
- The translation on hover is not immediate because it uses the `title` HTML attribute, that has a little delay.
- If you speak Spanish (or have a good ear) you'll notice that for the 4th intervention, it doesn't notice that it's a question, so both the transcription and the translation are wrong. That's what happens with automation!

In any case, I think it's neat and even those little mistakes made by the audio recognition and translation can be manually fixed by the teacher, and most of the work would be automatic.

### Possible future improvements
- Allow usage of output templates.
- Add some tool for easy manual fixes.
- Enable more flexibility on the options to use different services, if the user wants to.

