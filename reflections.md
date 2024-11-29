---
title: Reflections
layout: main
---

# Reflections

{% assign links = site.texts | where: 'category', 'index' %}

{% for link in links %}
- [{{link.title}}]({{link.permalink}}). {{link.description}}
{% endfor %}
