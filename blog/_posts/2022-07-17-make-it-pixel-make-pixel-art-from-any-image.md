---
layout: post
title: Make It Pixel!
subtitle: Make pixel art from any image
date: 2022-07-17
---
There are several options out there for generating pixel art from images. However, none has all the things I would like to have at the same time, so I decided to make my own.

A little **disclaimer**: I have great respect for pixel artists and I know that "pixel art" is not the most proper name for what programs like mine generate. But lacking a better term, and because everyone uses it, I'll do it too, being aware that generated generated pixel art has flaws that any artist could point out and correct. 

## Motivation

What would I expect from a pixel art generator?

- Re-scaling of an image to a given resolution.
- Optional use of fully customizable palettes.
- Parameterizable color quantization and dithering.
- Background removal.
- Optional outlines.
- Control over image preprocessing options.
- Fast to use over large amounts of images.

There are tools out there pretty close to what I want, but, as I said, none has them all. Some have very basic and rigid algorithms others some are GUI based and thus must process the files one by one... and even worse, some don't work on Linux! Most of them discard the option of trying out different configurations on several files at once. In short, if I want to meet my needs, I must do it myself.

With this motivation, I created **MakeItPixel**.

https://github.com/MiguelMJ/MakeItPixel

The ideal design I had in mind would offer as much customization as possible, implementing different algorithms to get the best of each possibility. But with great flexibility, comes a big headache trying to find the perfect configuration; so the system would have to be intelligent enough to consider autonomously the best  alternatives to get a quality pixel-art-like image. I wouldn't say that this version achieves this, but it's definitely on the right path.

## Implementation

The prototype only implemented two basic scaling and color quantization algorithms, based on RGB distance and gray values distance, and automatic palette generation, based on what I learnt of color schemes from [W3school](https://www.w3schools.com/colors/colors_schemes.asp) and [Wikipedia](https://en.wikipedia.org/wiki/Color_scheme). Then, I saw the [video from javidx9 on dithering](https://www.youtube.com/watch?v=lseR6ZguBNY) and I immediately added options to apply both the Floyd-Steinberg algorithm explained in the video and [ordered dithering](https://en.wikipedia.org/wiki/Ordered_dithering), that I read again on Wikipedia.

The steps of a MakeItPixel run for a loaded image are the following:

1. Generate a palette if necessary.
2. Downscale the image. 
3. Apply color quantization.
4. Apply dithering.

Each and every step can be configured in different ways or skipped.

|||
|:-:|:-:|
| ![original](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ua3msrfqwfpovicgmdcw.png) <br> Original| ![scaled](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uod0yxj8iqf48gvutzsy.png) <br> Scaled|
| ![quantized](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fberrcua19tadusjnnq2.png) <br> Quantization| ![dithered](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g5c17sts5gdf08zlw1vq.png) <br> Dithering|

_Steps 3 and 4 are actually performed at the same time but I think it's more visual to see it like this._

A more detailed description of the process can be found in the [wiki](https://github.com/MiguelMJ/MakeItPixel/wiki/Process).

## Plans for the future

This first version already has some interesant features that differentiate MakeItPixel from others: the full customizability of the palette, automatic palette generation, selection of different quantization and dithering algorithms or the independence from a GUI, that comes with the possibility to  process hundreds of images quickly.

However, it still lacks some of the features I first envisioned. Mainly:
- Smart palette extraction from an image.
- More preprocessing options, like blurring to reduce noice before downscaling.
- Implementation of border detection to include outlines in the generated pixel art.
- Customization for matrices used in ordered dithering. Right now MakeItPixel only offers hard coded matrices.

Don't have a doubt that all these will exist in a future version.

Also, I used SFML to work with the images because is a library I've used for a long time and I feel really comfortable with it. However, the last year I've been using ImageMagick a lot and I found a great, great advantage: ImageMagick has support for GIFs, while SFML doesn't. Unless SFML 2.3 or SFML 3 changes that, it is possible that I would change the graphic library... but there is still time before that happens.

## MakeItPixel is open source!

- [GitHub repository](https://github.com/MiguelMJ/MakeItPixel).
- [Official documentation (wiki)](https://github.com/MiguelMJ/MakeItPixel).

The project is open to contributions, comments, feature requests... Star it if you like it to give it visibility and feel free to share your pixelated art online with the #MakeItPixel hashtag! 
