---
layout: main
title: CLI Toolbox
description: Recipies for the command line
category: dev-notes
position: 1
highlight: true
excerpt: Recipies for the command line.
---

{% capture text %}

## ffmpeg

Convert a `mkv` file to `mp4` ([source](https://stackoverflow.com/questions/63664953/converting-mkv-to-mp4#63665557)).

```shell
ffmpeg -i "vid.mkv" -map 0 -c copy -c:a aac "MP4/vid.mp4"
```

## entr

Use `entr` to execute a command every time a file is modified. For example, to watch the changes on a PDF file with a Markdown source while you edit it.

```shell
echo input_file.md | entr pandoc input_file.md -o output_file.pdf
```


{% endcapture %}

# CLI Toolbox

<nav role="doc-index" id="toc" class="card">
{% assign texthtml = text | markdownify %}
{% include toc.html html=texthtml %}
</nav>

{{texthtml}}