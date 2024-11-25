---
layout: post
title: Building and using Markov chains
subtitle: AI for text generation - Part II
date: "2021-09-26"
highlight: true
links:
    Hashnode: https://blog.miguelmj.dev/building-and-using-markov-chains-ai-for-text-generation-part-ii
    DEV.to: https://dev.to/miguelmj/building-and-using-markov-chains-ai-for-text-generation-part-ii-1172
---
In the [previous post](https://dev.to/miguelmj/introduction-to-markov-chains-ai-for-text-generation-part-i-eha) we saw some theory behind Markov chains. In this one we're going to define the datastructures and the process involved in the creation and usage of one.

**Important**: Although some code chunks in this post might look like JS of Python, they are all just pseudo-code.

## Data structures
Markov chains are directed graphs; the usual way to represent these is using an adjacency matrix. Each row will represent a word A and each column a word B; each cell will store the probability of B being the next word after A.

So if we had the following text: *"How much wood would a woodchuck chuck if a woodchuck could chuck wood"*, the matrix would like like this:

| \ | a | chuck | could | how | if | much | wood | woodchuck | would |
|---|---|---|---|---|---|---|---|---|---|
| **a**         | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| **chuck**     | 0 | 0 | 0 | 0 | 0.5 | 0 | 0.5 | 0 | 0 |
| **could**     | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **how**       | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| **if**        | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **much**      | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| **wood**      | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| **woodchuck** | 0 | 0.5 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| **would**     | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Do you notice something special about this matrix? Most of its entries are zero! So instead of implementing a matrix as, for example, an array of arrays and waste a lot of space in zeroes, we should use a [sparse matrix](https://en.wikipedia.org/wiki/Sparse_matrix) implementation with a dictionary or tuples and lists. Something like this:

```
[
(a, [(woodchuck, 1)]),
(chuck, [(if, 0.5), (wood, 0.5)]),
(could, [(chuck, 1)]),
(how, [(much, 1)]),
(if, [(a, 1)]),
(much, [(wood, 1)]),
(wood, [(would, 1)]),
(woodchuck, [(chuck, 0.5), (could, 0.5)])
(would, [(a, 1)])
]
```
and finally, we could compress it even more if we tokenize the text, replacing words by code numbers. In this case, the tokens will be the positions in the sorted list of unique words(`a` is `1`, `chuck` is `2`, etc), like this:
```
[
[(8, 1)],
[(5, 0.5), (7, 0.5)],
[(2, 1)],
[(6, 1)],
[(1, 1)],
[(7, 1)],
[(9, 1)],
[(2, 0.5), (3, 0.5)],
[(1, 1)]
]
```
Much better than the first matrix, right? Now let's see how we get the chain from the text

## Building the chain

### Preprocess the text
The first step consists on cleaning the text so we can get the more out of it. Some relevant steps here would be converting the whole text to lower case, expanding contractions and performing tokenization (replace words with their number of first appearance, for example). Steps like removing punctuation may be optional in this case, and other usual steps like lemmatization or removing stop words make no sense here.

An example of this would be:

- Before preprocessing:
  ```
  I don't think Albert will come. I think he said he wouldn't.
  ```
- After expansion and conversion to lower case:
  ```
  i do not think albert will come. i think he said he would not.
  ```
- After tokenization, using the following regex to define tokens: `([^\W_]+)|([,.;:?!]+)` (Tokens will be words, numbers and punctuation signs).
  ```
  token_dictionary = {
    'i': 1,
    'do': 2,
    'not': 3,
    'think': 4,
    'albert': 5,
    'will': 6,
    'come': 7,
    '.': 8,
    'he': 9,
    'said': 10,
    'would': 11
  }
  tokenized_text = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 1, 4, 9, 10, 9, 11, 3, -2]
  ```
Wait, what are those `-1` and `-2` doing at the beginning and the end of the list? Well, they are special tokens reserved to mark just that: when a sentence starts and when it ends. They will be important when generating sentences with the chain.

### Make a list of words and its followers
Now that we have a list with the tokenized text, we have to iterate it storing the number of appearances of each word and the frequency that other words appear after it:

```javascript
build_markov(tokenized_text):
    appearances = {}
    matrix = {}
    it = 1
    while it < tokenized_text.length 
        current = tokenized_text[it - 1]
        next = tokenized_text[it]

        // EXISTING WORD
        if current in appearances.keys
            appearances[current]++
            // EXISTING PAIR
            if next in matrix[current].keys
                matrix[current][next]++
            // NEW PAIR
            else
                matrix[current] = {next: 1}
    
        // NEW WORD
        else
            appearances[current] = 1
            matrix[current] = {next: 1}
        it = it + 1
    // FINALLY, NORMALIZE THE PROBABILITIES
    for word in matrix.keys
        for follower in matrix[word].keys
            matrix[word][follower] = matrix[word][follower] / appearances[word]
    return matrix
```
And your Markov chain would be ready to use!

## Generating text from the chain
Now, to generate the chain we will need a [roulette selection](https://en.wikipedia.org/wiki/Fitness_proportionate_selection) function to pick an element from a word-probability dictionary.

```javascript
roulette (words):
    selection = random_number() // floating between 0 and 1
    for candidate in words.keys
        probability = words[candidate]
        selection = selection - probability
        if selection < 0
            return candidate
```
And now, using that function we can use the Markov chain to generate a new word token given the previous:

```javascript
generate_next_token (matrix, token):
    return roulette(matrix[token])
```
Remember the special tokens `-1` and `-2`? This is where they come handy. Using them we are able to make the function that generates a full sentence:
```javascript
generate_sentence_tokens (matrix):
    tokens = [-1]
    while tokens.last != -2
        tokens.push(generate_next_token(matrix, token.last))
    return tokens
```
Finally, we just have to translate back tokens to words, ignoring the first and the last ones. You might also want to do some postprocessing to put uppercase where is due and fix the whitespaces, for example before punctuation signs. I leave that to you.

## Conclusion
The pseudo-code I've shown here works for a first order Markov chain. In the next posts, I will explain how to do a chain of order N and implement it in several languages. I hope you found this useful, please leave your thoughts in the comments!

