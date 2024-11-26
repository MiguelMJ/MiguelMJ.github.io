---
title: Comentarios
layout: main
permalink: /personal/comentarios
category: index
description: Comentarios sobre videojuegos o películas, centrados en los elementos míticos y filosóficos de su narrativa o su estética.
position: 3
---

{% assign textos = site.texts | where: 'category', 'comentarios' %}

# Comentarios

{% for text in textos %} 
- [{{text.title}}]({{text.permalink}}). {{text.subtitle}}
{% endfor %}
