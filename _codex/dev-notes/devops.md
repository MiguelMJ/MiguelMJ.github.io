---
layout: main
title: DevOps notes
category: dev-notes
position: 1
highlight: true
excerpt: Random devops notes.
---

{% capture text %}

Random devops notes.

## Docker

- To run docker inside docker (aware of related security issues) it's necessary to use `-v /var/run/docker.sock:/var/run/docker.sock` and maybe `sudo chmod +666 /var/run/docker`. Also, the user inside the container must also belong to the `docker` user group (`usermod -aG docker USER`). This will be useful in dockerized environments used in CI/CD pipelines that deploy another dockerized application.

{% endcapture %}

# DevOps notes

<nav role="doc-index" id="toc" class="card">
{% assign texthtml = text | markdownify %}
{% include toc.html html=texthtml %}
</nav>

{{texthtml}}