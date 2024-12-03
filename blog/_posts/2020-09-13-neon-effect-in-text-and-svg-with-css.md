---
layout: post
title: Neon effect in text and SVG with CSS
date: 2020-09-13
description: I'm currently working in a website for my portfolio and when I found a colour palette I was comfortab...
links:
  DEV.to: https://dev.to/miguelmj/neon-effect-in-text-and-svg-with-css-3dap
---
I'm currently working in a website for my portfolio and when I found a colour palette I was comfortable with, I bumped into a serious problem: the logo of one project blended with the background.

One approach to solve a problem like this is to add contour to highlight the image. Trying it out, I ended up with a really cool neon-like effect.

![without effect](https://dev-to-uploads.s3.amazonaws.com/i/aqf5d0zezle4b371saak.png)
*The logo without the effect*

![with effect](https://dev-to-uploads.s3.amazonaws.com/i/gayz2ox7i1qjdhv0jv59.png)
*The logo with the effect*

The CSS property used for this is the `filter` `drop-shadow`:
```css
img{
    filter: drop-shadow(0px 0px 3px #116466);
}
```
Where the parameters are `(x-off y-off blur color)`. Find more information [here](https://www.w3schools.com/CSSref/css3_pr_filter.asp).
**Note that the image must have SVG format**. There are other ways to obtain a similar effect with a SVG image, but the advantage that this method have is that it will work even in external images, not only inline SVG.

Also, this works on text too! Here's an example.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/vl7tnvu9qgvkxseszc12.png)
*Text without effect*
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/6pafqr52ss5r4asnu9b5.png)
*Text with effect*

I hope you find it useful!