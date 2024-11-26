---
title: Mito y autómata
layout: main
permalink: /personal/mito-y-automata
category: index
description: Apuntes y reflexiones sobre distintos temas relacionados con la historia y filosofía de las matemáticas, y las ciencias de la computación, su presencia en el arte y la cultura, etc.
position: 2
---

{% assign textos = site.texts | where: 'category', 'mito-y-automata' %}

# Mito y autómata

{% for text in textos %} 
- [{{text.title}}]({{text.permalink}}). {{text.subtitle}}
{% endfor %}
