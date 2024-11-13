---
layout: main
title: Projects
---

# Projects

Open source software I've written.

{% for project in site.projects %}
<hr/>
<p>
<a href="{{project.url}}">
    <strong>{{project.title}}</strong></a>
-  {{project.description}}
</p>
<p>
{% for link in project.links %}<small><a class="card" href="{{ project.links[link.first] }}">{{link.first}}</a> </small>{% endfor %}
</p>
{% endfor %}
