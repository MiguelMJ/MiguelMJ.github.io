---
layout: post
title: Correctly escaping regular expressions
date: 2020-08-30
author: Miguel MJ
tags: ['\n  -regex', '\n  -tips', '\n  -beginners']
dev_url: https://dev.to/miguelmj/correctly-escaping-regular-expressions-27nc
---
Regular expressions are often difficult to understand and even more difficult to write. Probably one of the most confusing topics when you're starting is the **escaping special characters**.



### When and why we escape characters

Regular expressions (_regex_ for short) are tools for matching patterns in text. There are some special characters with special meaning (their explanation is not the point of this post), and if we want to use those characters **without its special meaning**, we _escape_ them by putting a backslash (`\`) before them. Note that this makes `\` a special character too!

A simple example: the regex to match _exactly_ `Count balance: 50$` will be `Count balance: 50\$`.

What happens with is that in most languages `\` is a special character for strings! So the string to build the regex of the previous example would be: `Count balance: 50\\$`.



### Tip to escape regex manually

Think about the translation from match to regex to string, not from string to regex to match.

What if we wanted to match `[ERR] $var has value "gg"`?

1. _Match_: 



    `[ERR] $var has value "gg"`

2. To _Regex_: `[`,`]`,`$` and `"` are special characters in this regular expression. We escape them:

 

    `\[ERR\] \$var has value \"gg\"`

3. To _String_: `\` and `"``are special characters in this string. We escape them:



    `\\[ERR\\] \\$var has value \\\"gg\\\"`



The thing is to write down an example of what you want to match and escape step by step the special characters for the regex and for the string until you have the one that you must use in your program.



### Escape them with functions

_(Links to Stack Overflow answers)_

Also, another option is to escape (or quote) the regex with a utility function. Some languages, like [Python](https://stackoverflow.com/questions/4202538/escape-regex-special-characters-in-a-python-string) or [Java](https://stackoverflow.com/questions/60160/how-to-escape-text-for-regular-expression-in-java) provide them by standard. In others, like [JavaScript](https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript) or [C++](https://stackoverflow.com/questions/39228912/stdregex-escape-backslashes-in-file-path), you must craft it yourself.

**But beware!** Be sure to use this kind of functions with regex in which you don't want special characters, because if you're not careful, you can end up escaping something you shouldn't and messing up the regex.


