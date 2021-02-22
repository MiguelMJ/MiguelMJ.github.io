---
layout: post
title: Making a level editor with SFML (C++) - Part 1
date: 2021-02-21
author: Miguel MJ
tags: ['\n  -cpp', '\n  -sfml', '\n  -gamedev']
dev_url: https://dev.to/miguelmj/making-a-level-editor-with-sfml-c-part-1-2mm0
---
A level editor is something that I've wanted to do for a long time in SFML, but has always been delayed. Fortunately, my last project (Candle, a library for 2D lighting), made me dive entirely into SFML again, so when I finished it, the natural thing was to start with the editor project right ahead.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Candle v1.0 is out! Now it provides different types of light sources, with dynamic shadow casting and optionally textured fog, as easy to intergrate as before! Check the tutorials in the official documentation.<br>Code: <a href="https://t.co/Tkblw0sM5o">https://t.co/Tkblw0sM5o</a><br>Docs: <a href="https://t.co/u4PqpW9coF">https://t.co/u4PqpW9coF</a><br><a href="https://twitter.com/hashtag/SFML?src=hash&amp;ref_src=twsrc%5Etfw">#SFML</a> <br><a href="https://t.co/Zo3avWPvOO">pic.twitter.com/Zo3avWPvOO</a></p>&mdash; MiguelMJ (@MiguelMJdev) <a href="https://twitter.com/MiguelMJdev/status/1361810747764932611?ref_src=twsrc%5Etfw">February 16, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## The design

### The GUI

There are several libraries to make GUIs in SFML. However, I didn't want to use any of them, for two reasons: first, I wanted to learn to make GUIs from scratch in order to know how to implement one in my future game; second, I may suffer a little bit of [NIH](https://en.wikipedia.org/wiki/Not_invented_here) syndrome.

Anyways, the GUI I require is intended for my personal use and not very complex. The required features are:

- Pannable views with resizable viewports.
- A basic clickable menu.
- A color picker.
- Modularity centered around tools, so that it is easy to add new ones and scale the already implemented.

### The levels

The editor will be focused on a tile world (or grid world). The levels I want to make would have the following components (note: I will be using the words component and entity, but **not** in terms of the [ECS](https://en.wikipedia.org/wiki/Entity_component_system) architecture):
- Visual component. It will be divided in layers (maybe with parallax) and it would require tools to:
  - Set and transform the texture of a cell.
  - Set the color of a cell.
  - Set and transform visual elements that are not fixed to the grid.
  - Set and transform light sources and lighting areas (here I will use Candle).
- Collisions component. It will require a tool to set the type of each cell, where the type can be:
  - Solid cells.
  - Unsolid cells.
  - Cells with a solid slope.
- Dynamic components. These will be the entities within the level that do not belong to the grid, that will have the following elements:
  - A sprite, optionally animated.
  - A collision rectangle, circle or capsule.
  - Some basic physic properties, as velocity and bounciness.
- Lastly, I would like to make the levels scriptable. I will be embedding Lua in the editor, so I can test directly the scripts there.

# Serialization

Obviously, any editor would be useless if you couldn't save you work. I will use [cereal](https://uscilab.github.io/cereal/index.html) to serialize the levels and the custom assets.

***

What is your experience with SFML? Have you got any project that you want to share? Feel free to leave a comment with any library that would be useful for other people using SFML!


