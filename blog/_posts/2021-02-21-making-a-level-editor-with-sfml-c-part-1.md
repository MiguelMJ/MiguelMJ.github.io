---
layout: post
title: Making a level editor with SFML (C++) - Part 1
date: 2021-02-21
---

A level editor is something that I've wanted to do for a long time in SFML, but has always been delayed. Fortunately, my last project (Candle, a library for 2D lighting), made me dive entirely into SFML again, so when I finished it, the natural thing was to start with the editor project right ahead.

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
