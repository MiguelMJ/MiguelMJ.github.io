---
title: Personal
layout: main
---

# Personal

{% assign links = site.texts | where: 'category', 'index' %}

{% for link in links %} 
- [{{link.title}}]({{link.permalink}}). {{link.description}}
{% endfor %}
