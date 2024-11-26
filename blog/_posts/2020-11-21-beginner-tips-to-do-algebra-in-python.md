---
layout: post
title: Beginner tips to do Algebra in Python
date: 2020-11-21
description: There are two kind of people that usually share a common difficulty when starting to use Python:...
highlight: true
links:
  Hashnode: https://miguelmj.hashnode.dev/beginner-tips-to-do-algebra-in-python
  DEV.to: https://dev.to/miguelmj/beginner-tips-to-do-algebra-in-python-477e
---

There are two kind of people that usually share a common _difficulty_ when starting to use Python: those who learn it without previous coding experience and those who come from a low-level programming background.
I fall under the second category and when it comes to certain problems I know we tend to ignore possible native solutions and try to solve them in an algorithmic way. This is nice (and better) for learning, but high level languages usually offer solutions that will be easier to code, understand and maintain.

I will assume you understand lists, dictionaries and sets in Python and the basics of algebra.

**Contents**
 1. List, Dictionary and Set Comprehension
 2. Set operations
   - Sets of sets
 3. `functools` module
   - `functools.reduce`
   - `functools.lru_cache`

## List, Dictionary and Set Comprehension

Let's say we have a list containing some numbers and we want to extract from it only the even ones into a separate list. A perfectly valid approach would be:

```python
mylist = [5,4,3,7,8,1,12]
even = []
for n in mylist:
  if (n%2 == 0):
    even.append(n)
print(even)
# [4,8,12]
```

This is pretty standard for C-family languages, for example. However, a most pythonic way is to use a **list comprehension**:

```python
mylist = [5,4,3,7,8,1,12]
even = [x for x in mylist if x%2 == 0]
print(even)
# [4,8,12]
```

List comprehension is a way of specifying the contents of a new list by an expression and an optional condition related to the elements of an iterable object. The syntax is the following:

```python
# without filter
[expression for element in sequence]
# with filter
[expression for element in sequence if condition]
```

So another example could be to copy a list of strings, changing all of them to upper case:

```python
names = ['Mikkel', 'Jonas', 'Martha']
uppernames = [name.upper() for name in names]
print(uppernames)
# ['MIKKEL','JONAS','MARTHA']
``` 

Now, you can also define sets and dictionaries by comprehension:

```python
# sets
set(expression for element in sequence)
{expression for element in sequence}
# dicts (note here's a difference in the key value specification)
dict((key,value) for element in sequence if condition)
{key:value for element in sequence if condition}
```

But there is more! You don't have to iterate just a single sequence. Python allows you to add more than one `for <sequence>` in your comprehensions. Let's see some examples:

```python
# dictionary merge
merged = {k:v for (k,v) in dict1 for (k,v) in dict2}
# cartesian product of two sets
# - note that the result is not a dict, but a set of tuples
cartesian = {(x,y) for x in set1 for y in set2}
```

[Here](https://www.smallsurething.com/list-dict-and-set-comprehensions-by-example/) you'll find more examples on list, dict and set comprehensions.

## Set operations

Now, with set comprehension it's easy to define usual operations between sets. Nonetheless, Python already defines these operations natively:

```python
abcde = {'a','b','c','d','e'}
vowels = {'a','e','i','o','u'}

intersection = abcde & vowels
# {'a','e'}
union = abcde | vowels
# {'a', 'b', 'c', 'd', 'e', 'i', 'o', 'u'}
difference = abcde - vowels
# {'b','c','d'}
symmetricDifference = abcde ^ vowels
# {'b','c','d','i','o','u'}
```

_Note that the output doesn't need to be sorted, but I wrote it that way to make it easier to understand._

Now, there are not only operations that result on new sets, but also boolean operators like:

```python
isStrictSubset1 = abcde < abcde
# False
isStrictSubset2 = difference < abcde
# True

isSubset1 = abcde <= vowels
# False
isSubset2 = abcde <= abcde
# True
isSubset3 = difference <= abcde
# True

isEmptySet = bool(abcde)
# False
isEmptySet = bool(abcde - abcde)
# True
```

### Sets of sets

A limitation to have in mind when working with sets in Python is that sets can only contain hashable types (int, char, tuples...) and sets themselves are not hashable. For this reason, if you want to store a set of sets, you must use instead a list of sets. Fortunately, this time list comprehension plus list operations can make it to replace the set operations.

```python
set1 = [{1,2,3}, {'a','b','c'}, {'A','B','C'}]
set2 = [{'a','b','c'}, {'b','c'}, {'c'}]

intersection = [x for x in set1 if x in set2]
# [{'a','b','c'}]
difference  = [x for x in set1 if x not in set2]
# [{1,2,3}, {'a','b','c'}, {'A','B','C'}]
union = set2 + difference
# [{'a', 'b', 'c'}, {'b', 'c'}, {'c'}, {1, 2, 3}, {'A', 'B', 'C'}]

# You get the idea
```

## `functools` module

This is a useful python module that provides very interesting utilities, from which I'll only talk about two: `reduce` and `@lru_cache`.

[Here](https://docs.python.org/3/library/functools.html) you'll find the complete official documentation on this module.

### `functools.reduce`

`reduce` is very powerful tool, as it can generalize almost any (if not all) iterative processes on a list, and I strongly recommend you to dive deeper yourself in its use. For the purpose of this post, I will just use it to generalize the operations between an undefined number of sets.

Let's say we have the same list of sets as before and we want to make the union of all of them. A valid approach would be:

```python
set1 = [{1,2,3}, {'a','b','c'}, {'A','B','C'}]
union = set() 
for x in set1:
  union = union | x
```

But with reduce the exact same behaviour is obtained as it follows:

```python
set1 = [{1,2,3}, {'a','b','c'}, {'A','B','C'}]
union = functools.reduce(set.union, set1)
# {1, 2, 3, 'a', 'A', 'b', 'c', 'B', 'C'}
```

The first argument is the function to apply and the second is the list to which it will be applied, in an accumulative way. _Note that I didn't use the operator `|` as before. Instead, I had to use the named function `set.union`. To find the named functions corresponding to the set operators, you can type `help(set)` in your Python console._

### `@functools.lru_cache`

As you can imagine, though comprehensions are easy to type and understand, they are not precisely cheap in computation time. The module `functools` provides us with several ways to cache the results of a function (note that a similar behaviour is obtained for class methods with `@functools.cached_property`).

```python
@functools.lru_cache
def count_vowels(sentence):
  sentence = sentence.casefold()
  return sum(sentence.count(vowel) for vowel in 'aeiou')
```

With such a simple annotation above the function definition, a number of calls will store its result, in case they are called again, to return it instead of executing the same code again.

This is useful not only for computationally expensive functions that won't change the result, but also for recursive functions that will be repeated. For example:

```python
@functools.lru_cache
def factorial(n):
  return n*factorial(n-1) if n else 1
```

## Practical example

Let's see how this apply, for example, to track familiar relations.

```python
import functools

# https://en.wikipedia.org/wiki/Transitive_closure
def transitiveClosure(relation):
    closure = relation
    while True:
        delta = {(x,y) for (x,r1) in closure for (r2,y) in closure if r1 == r2}
        newClosure = closure | delta
        if newClosure == closure:
            break
        closure = newClosure
    return closure;

# Direct descendance information
childRelation = {
         ('Martha','Ulrich'),
         ('Mikkel','Ulrich'),
         ('Magnus','Ulrich'),
         ('Mads','Tronte'),
         ('Ulrich','Tronte'),
         ('Tronte','Agnes'),
         ('Jonas','Hannah'),
         ('Jonas','Michael')}

descendantRelation = transitiveClosure(childRelation)

# Some functions using our new relation
@functools.lru_cache
def ancestorsOf(x):
    return {b for (a,b) in descendantRelation if a==x}

def isDescendantOf(x,y):
    return y in ancestorsOf(x)

def areRelated(peopleList):
    ancestors = [ancestorsOf(x) for x in peopleList]
    commonAncestors = functools.reduce(set.intersection, ancestors)
    return bool(commonAncestors)

print(ancestorsOf('Martha'))
# {'Agnes','Tronte','Ulrich'}
print(isDescendantOf('Jonas', 'Agnes'));
# False
print(isDescendantOf('Martha', 'Agnes'));
# True
print(areRelated(['Martha', 'Jonas']));
# False
print(areRelated(['Martha', 'Magnus', 'Mikkel']));
# True
```
