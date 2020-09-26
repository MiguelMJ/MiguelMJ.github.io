---
layout: project
logo: /assets/img/Candle/logosymbol.svg
title: Candle
documentation: /Candle
slogan: 2D lighting for SFML
github_repo: Candle
badges: # optional too
    - src: https://img.shields.io/badge/C++-11-informational
      alt: C++11
    - src: https://img.shields.io/badge/SFML-2.5-informational
      alt: SFML2.5
    - src: https://img.shields.io/badge/license-MIT-informational
      alt: License
    - src: https://img.shields.io/github/repo-size/MiguelMJ/Candle
      alt: repo-size
---

## Background

Almost since I started working with SFML, I wanted to learn how to make light effects with it. I saw some videos of projects that used dynamic lighting, but didn't share the code, and also this library called Let There be the Light, but I didn't fully understand it. I didn't found enough documentation and maybe it was too advanced for me at that time.

I focused on learning other things, but always waiting to be prepared enough to face the lighting system of a game. The moment I could not resist anymore was when I discovered the channel of [javidx9](https://www.youtube.com/channel/UC-yuWVUplUJZvieEligKBkA). I can't recommend him enough, I just love that guy. He is a great inspiration and a great teacher. His video [Line Of Sight or Shadow Casting in 2D](https://www.youtube.com/watch?v=fc3nnG2CG8U&t=2174s) made me want to finally try to implement 2D lighting for my own works. Candle is the result.

It has been through some phases: first it was a simple demo implementing the algorithms explained in the video, then I used the code to make the lighting system of [Velero](/projects/Velero-Engine) and finally I made it an independent library.

I don't know much about shaders, and I'm aware they would be very useful for this project. For now I rely on blending modes and interpolation to make light, but there will be a moment where that's not enough, so that may be the point where I decide to also learn OpenGL. For now, Candle is perfectly valid to include some lights and shadows in your SFML application or game. They make things much more interesting!
