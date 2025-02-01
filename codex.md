---
title: Codex
layout: main
---

# Codex

This is a sort of digital garden and personal wiki where I keep both small notes and elaborated texts on different topics. You may find incomplete texts!
 
{% assign links = site.codex | where: 'category', 'index' %}

{% for link in links %} {% assign category = link.title | slugify %}
- [{{link.title}}]({{link.url}}). {{link.description}}{% assign sublinks = site.codex | where: 'category', category %}{% for sublink in sublinks %}
  - [{{sublink.title}}]({{sublink.url}}). {{sublink.description}}{% endfor %}{% endfor %}
