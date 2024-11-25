---
title: Mito y autómata
layout: main
---

{% assign textos = site.texts | where: 'category', 'mito_y_automata' %}

# Mito y autómata

{% for text in textos %} 
- [{{text.title}}]({{text.permalink}}). {{text.subtitle}}
{% endfor %}
