---
layout: project
logo: /assets/img/NOG/logo.svg
title: Notes Generator
slogan: Take easy beautiful notes
github_repo: NotesGenerator
badges:
    - src: https://img.shields.io/badge/platform-linux-informational?logo=linux&logoColor=white
      alt: platform
    - src: https://img.shields.io/badge/license-GPL_3.0-informational
      alt: license
    - src: https://img.shields.io/badge/documentation-README, man_page-informational
      alt: documentation
    - src: https://img.shields.io/github/repo-size/MiguelMJ/NotesGenerator
      alt: repo-size
---

## Background

As soon as I learnt about LaTex I fell in love with the beauty of its results. I began to use it in the university to make my notes and some classmates even asked me to have them because of its quality. However, it passed little time after I got tired of how much I had to write every time, and as I tried to keep a standard style (I admit I had no idea how to use sty files) I repeated a lot of code and with so much commands that editing my notes was a bit tedious. At that point of my life I didn't know much about Markdown and I also felt it was not as customizable as I would like to, so I decided to create NOG (Notes Generator) to automate the process.

Although it's been some years now, the only thing that I've improved about it are the documentation, the way it manages CLI options and the configuration files. Because notes style depend on personal taste and on the subject of the notes, I wanted the code to be easy to extend or adapt. Maybe today I would use different technologies to do it, but in this version Bash and Flex do the trick pretty well, so I don't think I'll be making a new NOG soon.

This project is one of the first to include such a complete documentation, so even though it didn't required the most work or engineering, it is one that I like to have as a reference.

The following is a copy of the README found in GitHub.

***

#### Contents

- [What is NOG?](#what-is-nog)
  - [And why not just markdown and pandoc?](#and-why-not-just-markdown-and-pandoc)
- [Usage](#usage)
- [Build NOG](#build-nog)
- [Configuration file](#configuration-file)
- [Features](#features)
  - [Escaping](#escaping)
  - [Indentation](#indentation)
  - [Sectioning with Units](#sectioning-with-units)
  - [Emphasis](#emphasis)
  - [Footnotes](#footnotes)
  - [Lists](#lists)
  - [Code](#code)
  - [Fixmes](#fixmes)
  - [Keywords](#keywords)
  - [LaTex preamble](#latex-preamble)
  - [LaTex commands](#latex-commands)
  - [Symbol substitution](#symbol-substitution)
- [To do](#to-do)
- [License](#license)

## What is NOG?

LaTex is pretty, we can all agree in that. But taking notes in LaTex can be really tedious, too. NOG is a way to simplify this process. It's a pseudo-language converted to LaTex via Flex and then to PDF via pdflatex. It is intended to be some kind of medium point between Markdown and LaTex, something easy to write but extensible and customizable.

### And why not just markdown and pandoc?

Writing notes in Markdown and translating to LaTex with pandoc is great, and you should also try it. But **NOG doesn't intend to be a format translator. Its purpose is to both simplify part of the LaTex syntax and unify some aspects that may require some boilerplate LaTex code**, like the section tocs or the glossary, for example.

And, of course, another equally important reason is the possibility of extending NOG with new rules in Flex or LaTex commands. In the end the idea is to have nicer results with less typing.

This is a comparison side by side of some notes with NOG syntax and the equivalent in LaTex (not taking on count the preamble!):

NOG | LaTex
---|---
![](/assets/img/NOG/example_nog.png) | ![](/assets/img/NOG/example_tex.png)

And this the body of the result document:
<kbd>
<img src="/assets/img/NOG/result-2.png">
</kbd>
To see more check the [examples folder](examples)

## Usage

`nog [options] <input_files>`

 Options | Description 
---|---
`-h`| Display a help message and exit. 
`-v`| Display the version of the software and exit. 
`-c`| Generate a [configuration file](#configuration-file) and exit. 
`-a <author>`| Set the author of the notes. It is empty by default. 
`-t <title>`| Set the title of the notes. It is 'Notes' by default. 
`-d `| Omit the date in the title. 
`-o <output_file>`| Specify name of output file without the. pdf extension. It is 'Notes' by default (produces 'Notes.pdf'), 
`-g`| Add an appendix with the glossary. 
`-f`| Add an appendix with the list of fixme. 
`-k <seconds>`| Set how much to wait until killing `pdflatex` if it doesn't compile. 
`-l <language>`| Set the language for the package `babel`. 
`-s, --save`| Save all temporal files (including the .tex) in a directory called`nogtemp`. 
`--only-tex`|Do not generate the .pdf, only the .tex file. Invalidates the `--also-tex` option.
`--also-tex`|Generate the .tex, besides the .pdf file. It has no effect with the `--only-tex` option.
## Build NOG

The three targets of the makefile are quite straightforward: 

- `make all` to compile the binaries.
- `sudo make install` to install the binaries.
- `make doc` to compile the man page.
- `sudo make install-doc` to install the man page.
- `sudo make uninstall`  to uninstall the binaries and the man page.

If you want to install NOG:



{% highlight None linenos %}
$ cd path/to/the/project
$ sudo make install
...
$ nog -v
nog v1.2

{% endhighlight %}


If you just want to build it, without installing:



{% highlight None linenos %}
$ cd path/to/the/project
$ make
...
$ ./nog -v
nog v1.2

{% endhighlight %}


## Configuration file

If `nog` is run in a directory that contains a `.nogconfig` file, then uses the values specified in it as options. Nonetheless, **options passed via command line will override the ones found in the command line**.

The options of the `.nogconfig` are case insensitive and empty values are ignored.

[`nog -c`](#usage) generates a `.nogconfig` file, if there is none in the working directory.

| Configuration          | Description                       |
| ---------------------- | --------------------------------- |
| `input=<file>`         | Equivalent to `nog <file>`.       |
| `title=<title>`        | Equivalent to `nog -t <title>`.   |
| `author=<author>`      | Equivalent to `nog -a <author>`.  |
| `date=<date>`          | Equivalent to `nog -d <date>`.    |
| `file=<file>`          | Equivalent to `nog -o <file>`.    |
| `glossary=yes`         | Equivalent to `nog -g.`           |
| `glossary_name=<name>` | Set the name of the glossary.     |
| `fixme=yes`            | Equivalent to `nog -f`.           |
| `fixme_name=<name>`    | Set the name of the fixme list.   |
| `timeout=<seconds>`    | Equivalent to `nog -k <seconds>`. |
| `language=<lang>`      | Equivalent to `nog -l <lang>`.    |
| `save=yes`             | Equivalent to `nog -s` .          |
| `only_tex=yes`         | Equivalent to `nog --only-tex`.   |
| `also_tex=yes`         | Equivalent to `nog --also-tex.`   |

## Features

The files passed to the `nog` command are processed in order, so you could think of them as a single concatenated file. Their content are passed to the body of the LaTex document.

### Escaping

There are some characters in LaTex that must be escaped when not in math mode. NOG escapes them in the context where it is clear that they must be escaped:
- `_` is escaped everywhere outside math mode.
- `$` is escaped within the name of units, unit sections and unit subsections, keywords and snippets.(see below)

### Indentation

In my opinion, the way LaTex handles indentation can be sometimes capricious. NOG gives control to the user, with a simple rule. A new line is indented only if starts with a white space.



{% highlight None linenos %}
This line won't be indented.
This line won't, either.
 This one will be indented.
   This one too, with the same space as the one above, even though I have used more whitespaces here.

{% endhighlight %}


### Sectioning with Units

To keep it simple, NOG uses just three levels of sectioning: _Unit_, _Unit section_ and _Unit subsection_. The main Table of Contents contains just the Units, and each Unit contains another ToC with its unit sections and unit subsections.



{% highlight None linenos %}
Unit
****
Unit section
============
Unit subsection
---------------

{% endhighlight %}


### Emphasis

Double asterisks for bold text and double underscore for italic test to mark keywords.



{% highlight None linenos %}
**bold**
__italic__

{% endhighlight %}


### Footnotes

Footnotes use arabic numbers, restarting in each page.



{% highlight None linenos %}
_(footnote)_

{% endhighlight %}


### Lists

Lists between `{*` and `*} `use bullets.

Lists between `{#` and `#} `use numbers.

Lists between `{.` and `.}` use none.

Items starting with `-` are normal items.

items starting with `+` start with bold text until a dot (`.`), a colon (`:`) or a new line.



{% highlight None linenos %}
{*
- first item
- second item
+ important: this is another item
*}

{% endhighlight %}


### Code

The insertion of code works the same way as in markdown.


{% highlight None linenos %}
	`code word`
    '''[language]
    code block
    '''

{% endhighlight %}


_Note_: For format reasons I've used  ''' , but the correct way is \`\`\`.

#### External code

You can insert code directly from a file with the following syntax:



{% highlight None linenos %}
'''file:<path/to/file>[:language]
'''

{% endhighlight %}


_Note_: For format reasons I've used  ''' , but the correct way is \`\`\`.

### Fixmes

Also, a list of incomplete or wrong parts can be added. For this purpose you can just insert `((FIXME))` to any point of the document, and a link to it will be added in an optional appendix (see [`-f` option](#usage)).



{% highlight None linenos %}
((FIXME)) Complete this section
((FIXME)) Correct this formula

{% endhighlight %}


### Keywords

Keywords are marked by two exclamation signs. They are  appear in bold text and have a hand glyph pointing at them in the margin of the page. A link to them is added in an optional appendix (see [`-g` option](#usage)).



{% highlight None linenos %}
!!keyword!!

{% endhighlight %}


_Note_: Keywords doesn't support non ascii characters.

### LaTex preamble

Everything included between the lines  `#pre` and `#end` will be included in the preamble of the LaTex document.



{% highlight None linenos %}
#pre
\usepackage{amssymb}
#end

{% endhighlight %}


### LaTex commands

Latex commands can be used normally inside the notes.



{% highlight None linenos %}
\begin{center}
This text is centered.
\end{center}
The equation is $E=mc^2$

{% endhighlight %}


### Symbol substitution

NOG also makes some substitution to commonly used symbols that would be easier to write and understand in a graphical way.

#### Arrows (Text and math mode)



{% highlight None linenos %}
-> --> => ==>
<- <-- <= <==
<-> <--> <=> <==>

{% endhighlight %}


#### Function defined by parts (Math mode)



{% highlight None linenos %}
$$
abs(x) = {{
	-x & if x < 0 \\
	 x & otherwise
}}
$$

{% endhighlight %}


#### Other

- `>` and `<` in text mode are translated to `$>$ and `$<$`.
- `¬` is now translated to`$\neg$` in text mode and`\neg` in math mode. 

## Tips

Currently is not easy to find an error in the LaTex code produced by NOG. If you only use the features of NOG without direct LaTex commands, this wouldn't be a problem. But if you make mild or heavy use of LaTex in your notes, you may want to use the [`--only-tex` option](#usage) or the [`only_tex=yes` configuration](#configuration-file) and then use a LaTex editor of your choice.

## To do

- List of features pending to be implemented (although they can currently be done via LaTex commands):
    - Hyperlinks
    - Tables
    - Multicolumn text
    - Boxed text
    - Graphs/Trees (maybe automatize tikz)

## License

NOG is licensed under the GPL-3.0 License.bg
