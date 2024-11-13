---
title: Blog
layout: main
---

# Blog

Posts about programming and computer science.

{% for post in site.posts %}
<hr/>
<a href="{{post.url}}"><strong>{{ post.title }}</strong></a><br/>
{%if post.subtitle%}<em>{{post.subtitle}}</em><br/>{%endif%}<small>{{ post.date | date: "%Y-%m-%d" }}</small>
<p class="excerpt">
    {% assign pars = post.content | split: '<p>' %}
    {{ pars[1] | strip_html | truncate: 124 }}
</p>
{% if post.links %}
<p><em>Syndicated at</em>
{% for link in post.links %}<small> <a href="{{ post.links[link.first] }}">{{link.first}}</a> </small>{% endfor %}
</p>
{% endif %}
{% endfor %}