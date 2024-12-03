---
layout: main
---
{% capture text %}
{% assign category = page.title | slugify %}
{% assign pages = site.codex | where: 'category', category %}

# {{ page.title }}
{{ page.description }}

{% for page in pages %} 
- [{{page.title}}]({{page.url}}). {{page.subtitle}}
{% endfor %}
{% endcapture %}
{{ text | markdownify }}