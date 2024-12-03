---
layout: main
title: Projects
toc: true
---

{% assign featured_projects = site.projects | where: 'category', 'featured' %}
{% assign other_projects = site.projects | where: 'category', nil | where: 'superproject', nil %}
{% assign super_projects = site.projects | where: 'category', 'superproject' %}

# Projects

## FOSS

### Featured

Personal favorites, currently active or community supported.

{% include project_list.html projects=featured_projects %}

### Super projects

Tools that intend to be part of its own ecosystem.

<ul class="nobullet">
{% for project in super_projects %}
<li class="card"><p>
<a href="{{project.url}}">{{project.title}}</a><br/>
{{project.description}}
<br/>
{% for link in project.links %}<a href="{{ project.links[link.first] }}">{{link.first}}</a>{%if forloop.last%}{%else%}, {%endif%}{% endfor %}
</p>
{% assign subprojects = site.projects | where: 'superproject', project.title %}
{% include project_list.html projects=subprojects%}
</li>
{% endfor %}
</ul>

### Other

Mostly archived, some incomplete.

{% include project_list.html projects=other_projects %}

## Videogames

Coming someday? ;)

