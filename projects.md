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

Clusters of related projects.

<dl>
{% for project in super_projects %}
<dt>
<a href="{{project.url}}">{{project.title}}</a>
</dt>
<dd>
{{project.description}}
<br/>
<small>Links: {% for link in project.links %}<a href="{{ project.links[link.first] }}">{{link.first}}</a>{%if forloop.last%}{%else%}, {%endif%}{% endfor %}</small>
<span class="separator"></span>
{% assign subprojects = site.projects | where: 'superproject', project.title %}
{% include project_list.html projects=subprojects%}
</dd>
{% endfor %}
</dl>

### Other

Mostly archived, some incomplete.

{% include project_list.html projects=other_projects %}

## Videogames

Coming someday? ;)

