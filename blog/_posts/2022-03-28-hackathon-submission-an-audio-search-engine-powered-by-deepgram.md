---
title: An audio search engine powered by Deepgram
subtitle: Hackathon submission
date: 2022-03-28
layout: post
highlight: true
links:
  Hashnode: https://miguelmj.hashnode.dev/hackathon-submission-an-audio-search-engine-powered-by-deepgram
  DEV.to: https://dev.to/miguelmj/hackathon-submission-an-audio-search-engine-powered-by-deepgram-3cf
---

### Overview of My Submission

This submission consists on a CLI application to search for a word (whole or partial) among several audio sources, including Telegram chats.

Our conversations are stored in chats in all kinds of instant messaging services. How many questions, declarations, confessions, apologies, reminders and decisions have been interchanged today in text format? However, this conversations are constantly being mixed with voicemails. It is faster to talk than to write and also our brains understand much better the emotion of a message when we hear it spoken out. And yet, when we want to search for past messages, using the search option in our chats, only the text is considered. Audio is left aside, in a secondary place, but it should be actually as important.

### Submission Category: 

Analytics Ambassadors
Wacky Wildcards

### Link to Code on GitHub

https://github.com/MiguelMJ/AudioSearchEngine

### Additional Resources / Info

<!-- [Note:] # Screenshots/demo videos are encouraged! -->

The documentation of the project is in the repository's README.

I like to make my programs as customizable as possible, so I use the `argparse` library to automatically parse the command line arguments and also build this nice help message.
```
usage: main.py [OPTIONS] TERM FILES...

Search engine for audios with support for several audio sources. Powered by Deepgram.

positional arguments:
  TERM                  Word to search
  FILES                 Files to perform the search

optional arguments:
  -h, --help            show this help message and exit
  --no-ansi             Don't display color in the output
  -L NUM, --log-level NUM
                        log level. -1=quiet, 0=errors, 1=warnings, 2=info (default=2)
  -C NUM, --context NUM
                        number of words to surround the search hits in the output (default=2)
  -W, --whole-word      search for whole words only
  -o FILE, --output-file FILE
                        file to store the results of the search in a JSON format

Deepgram options:
  --deepgram-api-key X  Deepgram API key. By default, get it from a file named deepgramApiKey
  -P X=Y, --param X=Y   parameter for the Deepgram URL
  -F, --ignore-cache    ignore cached transcriptions and force an API call

Telegram options:
  --telegram-api-id X   Telegram API key. By default, get it from a file named telegramApiId
  --telegram-api-hash X
                        Telegram API hash. By default, get it from a file named telegramApiHash
  -T X, --telegram-chat X
                        chat from Telegram to retreive messages from
  -M NUM, --messages NUM
                        number of messages to retreive while looking for audios in each Telegram chat(default=100)

Source code: https://github.com/MiguelMJ/AudioSearchEngine
```

This is an example execution to search among local files:

![Example search among local files](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c8gns0z5bs3r7kjobcrs.png)
 
And this one, of an execution to search among the audios in the "me" chat in Telegram.

![Example search among Telegram audios](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/plptqzjkdckfh8q577yg.png)
 
The screenshot can't get all the output, but you get the idea.

Some things to consider if you want to try it:
- I've used the `-F` option for showcase purposes, you don't need to.
- The default language is Spanish (my native language), so you probably will have to either change that little line of code or use the `-P language=X` argument.
- All the logging is made to stderr, so you can safely pipe it to another command and only get the JSON output of the search.
- The Telegram integration is optional, if you are only going to search among local files. But if you want to use it, you must install the `telethon` dependency and have the API id and API hash provided by Telegram.
- In any case, a Deepgram API key is required.

#### Possible future improvements

- Add more remote audio sources, apart from Telegram chats (maybe Discord?).
- Make the search process more flexible using an edit-distance based match, instead of only exact matches.
- Allowing more complex queries: multiple words, regular expresions, etc.
- If you can think of another one, feel free to make a PR!
