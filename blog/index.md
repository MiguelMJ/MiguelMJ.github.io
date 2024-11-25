---
title: Blog
layout: main
---

# Blog

Posts about programming and computer science.
<ul class="nobullet">
{% for post in site.posts %}
<li class="card"><p>
<a href="{{post.url}}">
    {{ post.title }}
{%if post.subtitle%} - {{post.subtitle}}{%endif%}
</a>    
<br/>
<small><date>[{{ post.date | date: "%Y-%m-%d" }}]</date></small>
<br/>
<span class="excerpt">
    {% assign pars = post.content | split: '<p>' %}
    {{ pars[1] | strip_html | truncate: 124 }}
</span>
<br/>
{% if post.links %}
<em>Syndicated at</em>
{% for link in post.links %}<a href="{{ post.links[link.first] }}">{{link.first}}</a>{%if forloop.last%}{%else%}, {%endif%}{% endfor %}
{% endif %}
</p>
</li>
{% endfor %}
</ul>