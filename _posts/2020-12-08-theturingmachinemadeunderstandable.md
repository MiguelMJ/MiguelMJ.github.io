---
layout: post
title: The Turing Machine made understandable
date: 2020-12-08
author: Miguel MJ
tags: ['\n  -computerscience', '\n  -algorithms', '\n  -learn']
dev_url: https://dev.to/miguelmj/the-turing-machine-made-understandable-35po
---
When it comes to explain what is the Turing Machine, I feel scientific dissemination isn't always accessible for people without a specialized background. Before I studied it in university, I never really understood what it was, only that it had to do with the origins of computers and it was not a "real" machine. 



For that reason I want to summarize the concepts behind the Turing Machine and explain how it defined what we consider computation in the way I would have liked them to be explained to me.



## What is Computation?



When we talk about computation we, obviously, think about computers: digital information processing. Nonetheless, the actual meaning of computation is not limited to digital processing nor computers. We could say that



> Computation is every process for which a given input is transformed into a determined output, or result.



### Give me some examples



Some general processes of computation:



- A tree computes water and carbon dioxide into clorophyll and oxygen.

- A candle computes string and wax into light and heat.

- Our digestive system computes food into muscle, fat, energy and... wastes.

- A pocket calculator computes two numbers and an operator pressed on the keyboard into another number.



## What is a Computational Model?



To keep it simple, let us say that:



> A computational model is the definition of the rules that can follow the computations performed by a system.



For most of the previous examples, you can't really talk about a computational model because the systems are "natural" and just follow the laws of physics and chemistry. In the case of the pocket calculator, the computational model is too complex to explain it here.



### Some minimalistic examples



The most simple computational model could be imagined as a look-up table, where you look for the input you receive and produce the result written in the table.



- A table to invert a binary string:



    | Input | Output |
    |:---:|:---:|
    | 0 | 1 |
    | 1 | 0 |

    

    For the input `10100` the output is `01011`.



- A table to convert lower-case to upper-case:



    | Input | Output |
    |:---:|:---:|
    | a | A |
    | b | B |
    | c | D |
    | ... | ... |
    | z | Z |

    For the input `i love you` the output is `I LOVE YOU`.



### More complex minimalistic examples



Now, computational models are usually more complex than direct equivalence tables. They usually have **states**, which are taken into account as part of the computation. 



This states represent different parts of the process of computation and determine the output for an input. 



- If our model was a cooking pot full of water, we could define it like this:



    Initial state: `PotIsCold`

    

    | State | Input | Output | New State |
    |:---:|:---:|:---:|:---:|
    | PotIsCold | raw rice | wet raw rice | PotIsCold |
    | PotIsCold | heat | - | PotIsHot |
    | PotIsHot | raw rice | cooked rice | PotIsHot |
    | PotIsHot | heat | - | PotIsHot |
    

    You see that now we don't have just an entry for each input, but for the combinations of each input in each possible state of the model.

    

- For example, if we wanted to define a model that inverts one digit of every two alternately in a binary string, we could have:



    Initial state: `Invert`



    | State | Input | Output | New State |
    |:---:|:---:|:---:|:---:|
    | Invert | 0 | 1 | Pass |
    | Invert | 1 | 0 | Pass |
    | Pass | 0 | 0 | Invert |
    | Pass | 1 | 1 | Invert |

    

    For the input `111111` the output would be `010101`.



If you have understood it to this point, congratulations! You have understood Finite State Automata!



## The Turing Machine as a Computation Model



Now that we understand what is computation and computation models, we can talk about the Turing Machine. The name is misleading, because it is not _one machine_, but a _family of theoretical machines_.



A Turing Machine is imagined as a machine that reads from and writes to one tape of infinite size, using a _head_. The computational model also has a set of possible states, that determine what the machine does when it reads a symbol from the tape: write another symbol o move the tape.



Here you have a little demonstration on a Turing Machine online simulator that converts a decimal number to its binary representation.

<iframe width="560" height="315" src="https://www.youtube.com/embed/FFYRBcxsIp4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Try it youself [here](https://turingmachinesimulator.com/) (Examples > Binary to decimal > Compile).



## A Universal Computation Model



It's been mathematically proven that any computation process can be expressed as a Turing Machine. So the following question is... what if we use the definition of a Turing Machine _as the input of another Turing Machine_?



The answer is the Universal Turing Machine, that is defined in such a way that can simulate the behaviour of any Turing Machine, given its definition. This is what makes it a Universal Computation Model.



> Not only can it express any computing process, but a single model can simulate all others: it is a **general purpose computer**.



So this is why the Turing Machine was the precursor of the computers we know today. The concept of the Universal Machine behind it is exactly the same as that on which digital computers operate.



A digital computer is a machine (processor, memory, etc) that can execute any computation given its definition (program). This is the reason why computers have supposed a bigger revolution than any other kind of technology, because they don't have any specific purpose; they are able to automate everything that can be defined by an algorithm.



### Some trivia



- _Are digital computers really equivalent to the theoretical Turing Machine?_

  No. The memory of the Turing Machine (the tape) is infinite and computers have limited memory. However, with the huge amounts of memory that modern disks can handle and the possibility to distribute it over the Internet, that limitation is hardly a problem.



## Conclusion



As a Turing Machine can express and simulate any possible computation, studying its properties, limits and possibilities allows us to better understand which kind of problems are solvable by computers and which are not. The questions raised by this model are still being studied and many are still unanswered.



Turing invented his machine in 1936, and since then we haven't come up with a more powerful computation model. So as surprising as it may sound, even the latest artificial intelligence innovation could be performed by this simple model created almost a century ago.


