---
layout: main
title: C notes
category: dev-notes
position: 1
highlight: true
excerpt: Random C notes.
---

{% capture text %}

Random C notes.

## The getline/getdelim functions



- https://pubs.opengroup.org/onlinepubs/9699919799/functions/getdelim.html


## Print with dynamic width format

It is possible to put a dynamic width specifier to `printf` using `.*` in the format string. This is useful, for example, to print a just read line without the newline character.

```c
char *line = NULL;
size_t alloc_len;
getline(&line, &alloc_len, stdin);
printf("<%.*s>\n", recordline);
```

- https://stackoverflow.com/questions/7899119/what-does-s-mean-in-printf#7899144

{% endcapture %}

# C notes

<nav role="doc-index" id="toc" class="card">
{% assign texthtml = text | markdownify %}
{% include toc.html html=texthtml %}
</nav>

{{texthtml}}