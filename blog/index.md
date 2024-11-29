---
title: Blog
layout: main
---

{% assign lastyear = '' %}

# Blog

[RSS feed](/feed.xml)

<table class="simple">
<tbody>
{% for post in site.posts %}
{% assign year = post.date | date: "%Y" %}
{% if year != lastyear %}
</tbody>
</table>
<h2>{{year}}</h2>
<table class="simple">
<tbody>
{% endif %}
<tr><td><date>{{post.date | date: "%Y-%m-%d" }}</date></td><td><a href="{{post.url}}">
    {{ post.title }}
{%if post.subtitle%} - {{post.subtitle}}{%endif%}
</a></td></tr>
{% assign lastyear = year %}
{% endfor %}
</tbody>
</table>

<!--
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
-->