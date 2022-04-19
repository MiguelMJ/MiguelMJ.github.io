{% assign media = site.baseurl | append: "assets/media/" | append:  page.path | replace: ".md","" | replace: "_posts/",""  %}
![{{ include.alt }}]({{ media }}/{{ include.file }})
