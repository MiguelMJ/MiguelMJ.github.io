---
layout: post
title: Why and how to use pen and paper - Designing algorithms with no code
date: 2020-12-13
author: Miguel MJ
tags: ['\n  -beginners', '\n  -codenewbie', '\n  -productivity', '\n  -codequality']
dev_url: https://dev.to/miguelmj/why-and-how-to-use-pen-and-paper-design-an-algorithm-11nn
---
It's a common thing to see programming students staring silently at their code editor, with a blank look in their eyes, not knowing where to start when they are given an assignment. Although most teachers say _"pick up pen and paper before programming"_, there is a reason why some just don't do it: mostly because they don't know why or how.

So, how important is to _"pick up pen and paper"_?

## Your coding skills will always be limited by your problem solving skills

Programming is, by definition, designing a solution. In most cases this means designing an algorithm (sorry, declarative programming). 

To be a great programmer, it is more important to develop your ability to solve problems algorithmically and think abstractly about data than to know perfectly the syntax of any language. It will let you deconstruct the problem and solve it with whatever tools you have.

## How does it help using pen and paper?

In pseudocode, a flowchart or a drawing, data need no type, there are no syntax errors and you can focus on what you have and what you want, with the level of abstraction you need.

### Our minds understand visual information better

With code, it happens like with mathematical language. Our brain knows how to interpret images almost directly, but needs some more resources to interpret code or math.

**Intersection of two sets**


<table>
<thead>
<tr>
<th>Math</th>
<th>Image</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<link rel="stylesheet" media="screen" href="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/katex-6f41bf4c7d7955a8a0ab8dbe4d991fcc559b0ab51dbea515f047458827da2b96.css">

<div class="katex-element">
  <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>A</mi><mo>∩</mo><mi>B</mi><mo>=</mo><mo stretchy="false">{</mo><mi>x</mi><mo>:</mo><mi>x</mi><mo>∈</mo><mi>A</mi><mo separator="true">,</mo><mi>x</mi><mo>∈</mo><mi>B</mi><mo stretchy="false">}</mo></mrow><annotation encoding="application/x-tex">A \cap B = \{ x : x \in A, x \in B \} </annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.68333em;vertical-align:0em;"></span><span class="mord mathdefault">A</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span></span><span class="base"><span class="strut" style="height:0.68333em;vertical-align:0em;"></span><span class="mord mathdefault" style="margin-right:0.05017em;">B</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">{</span><span class="mord mathdefault">x</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">:</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mord mathdefault">x</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">∈</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:0.8777699999999999em;vertical-align:-0.19444em;"></span><span class="mord mathdefault">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.16666666666666666em;"></span><span class="mord mathdefault">x</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">∈</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathdefault" style="margin-right:0.05017em;">B</span><span class="mclose">}</span></span></span></span></span>
</div>
</td>
<td>
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--u_xu2eEZ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Set_intersection.svg/1280px-Set_intersection.svg.png" alt="Intersection Wikimedia" loading="lazy"><a href="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Set_intersection.svg/1280px-Set_intersection.svg.png"><em>Source: Wikimedia</em></a>
</td>
</tr>
</tbody>
</table>
The process your mind takes to understand the image is much shorter than to understand the expression.

### That applies to programming too

- The same happens when actively creating something. **It's more easy for you to come up with a solution** while using your eyes and hands on the paper than directly trying to express it in code.

- Furthermore, when you design before writing, **you can debug more easily**. The design offers you a panoramic view of the algorithm, which you can contrast with the code in successive iterations, to recognize the nature of the error.

If you're already convinced to pick up that pen and paper, you might find useful some tips for the process.

## Some guidelines on how to think when designing an algorithm

There are several ways to do this. In fact, Software Engineering offers a lot of different models on how to design software and abstract architectures to approach a lot of different problems. Here I want to give a very generic method, on which almost any other process is based.

### Thinking on the data representation

- **What information do you have and how you want/need to represent it?** Are you going to use predefined types or structures of the language? Do you need to define your own?

    - _Draw some examples of the data and let your brain perceive the gaps or redundancies._

- **What are the basic operations you can perform on this information?** You should be clear on what transformations you can apply to your data.

    - _In many languages the most basic is asignation. Be sure to understand how it works. The rest usually depends on whether is a number, a string, a collection, an object, etc_

    - _You will be able to use these basic operations as the building blocks of your algorithm._

### Thinking on the process
 
These are not sequential steps, but separate advice to develop your solutions.

- Before even trying to define the algorithm, it is better to **have some examples of input and output**. For this you can also specify some preconditions and postconditions: What is true before the algorithm is executed? What must be true after the algorithm is executed?

    - _If the algorithm depends on some arguments, pay special attention to them. Also, what useful information you can extract from them? Write that down too, if you think it will be worhtwhile._

- **You don't need to think it straight from the first step the last one**. Sometimes the last part of the algorithm is clearer than the first one. Go ahead and specify its latter part, and then focus on how to get to that point.

    - _Write or draw the steps you see clearly, try to connect them and fill the missing steps to finish._

- **Divide the problem in subproblems** until you are able to solve them with your basic operations. You can write first a high-level pseudocode or flow-chart version of the solution, and then go through each step, decomposing it in more steps.
    - _If you think you have more than one option, you can even specify various solutions and try them in code, to see if one works better than another._

## Conclusion

Different minds deal better with different methods, but in the end, learning and practising are the two only ways to improve. 

There is a direct synergy between solving problems and programming, but always remember: __the solution can exist without the code; the code can't exist without the solution.__

***
Do you have any advice for writing better code and designing algorithms more efficiently? I'll be glad to read your comments on this topic!


