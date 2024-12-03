---
layout: post
title: When numbers don't make sense
date: 2023-03-09
highlight: true
links:
    Hashnode: https://miguelmj.hashnode.dev/when-numbers-dont-make-sense
    DEV.to: https://dev.to/miguelmj/when-numbers-dont-make-sense-10gi
---

## Introduction

Most of the time, basic arithmetic is pretty simple and intuitive. Even working with powers and roots isn't that much of a headache. However, the IEEE standard for floating-point numbers includes special values that can mess things up: NaN (Not a Number), positive infinity and negative infinity. In fact, most algebraic properties of real numbers are no longer valid. The only purpose of this post is to show some cases I found interesting, where these values produce counterintuitive results.

> Cover image by [Armand Khoury](https://unsplash.com/@armand_khoury) from Unsplash

## Standard behavior of NaN and Infinity

* For all x: `NaN > x` is false.
    
* For all x: `NaN < x` is false.
    
* For all x: `NaN == x` is false.
    
* For all x: `NaN != x` is true.
    
* For all x except NaN and +Infinity: `+Infinity > x` is true.
    
* For all x except Nan and -Infinity: `-Infinity < x` is true.
    
* `Infinity / Infinity = NaN`
    
* `Infinity * 0 == NaN`
    
* `Infinity - Infinity == NaN`
    
* Any other arithmetic operation between a number and Infinity results in Infinity (with a possible change of sign).
    
* Any other arithmetic operation between a number (or Infinity) and NaN results in NaN.
    

Everything I will tell you from now is trivially deduced from understanding the list above; in other words, if you understand all its implications, I won't tell you much new. Anyway, I think it is interesting to review some side effects that may escape from us when we don't keep them in mind.

## Broken properties

The following is a non-exhaustive list of properties that we use to expect while programming, but are no longer true due to the existence of NaN and Infinity. I will provide the statement of the property (which doesn't hold) and then a piece of code in JavaScript and Python that implements a check for it, followed by a call that returns false.

*Note*: JavaScript produces `NaN` and `Infinity` values easily, not only because they are native values but because they result from regular operations (`Math.sqrt(-1)` or `1/0`). In the case of Python, they are implemented in the `math` library (`math.nan` and `math.inf`) and operations that would produce them (`math.sqrt(-1)` or `1/0`) will raise an exception. For this reason, assume the following header in each Python snippet.

```python
from math import nan, inf
```

*Disclaimer*: The snippets of JavaScript will also fail with values like strings or objects. I'm not trying to make any point about errors in JavaScript. The point is about the NaN and Infinity values, which belong to numeric types in any language with full support for the IEEE standard.

---

Now, behold the fall of the tautologies.

### Identity

Let's start with the most obvious and painful.

```javascript
function identity(x){
    return x == x
}
identity(NaN)
```

```python
def identity(x):
    return x == x

identity(nan)
```

Some of the following are direct results of this.

### A list can't contain elements that aren't equal to any element

Sorry for the apparent redundancy in the statement: check the examples to see what I mean.

```javascript
function checkIncludesEqual(arr, x){
    if(arr.includes(x)){
        return arr.some(e => e == x)
    }else{
        return true
    }
}

checkIncludesEqual([1, 2, NaN], NaN)
```

```python
def checkIncludesEqual(arr, x):
    if x in arr:
        return any(x == e for e in arr)
    else:
        return True

checkIncludesEqual([1, 2, nan], nan)
```

### The max value of a list is greater than or equal to the rest

```javascript
function checkMaxIsGE(arr){
    let maxVal = Math.max(...arr)
    return arr.every(x => maxVal >= x)
}
checkMaxIsGE([-1, 0, 1, NaN])
```

```python
def checkMaxIsGE(arr):
    maxVal = max(arr)
    return all(maxVal >= x for x in arr)

checkMaxIsGE([-1, 0, 1, nan])
```

### The min value of a list is lesser than or equal to the rest

```javascript
function checkMinIsLE(arr){
    let minVal = Math.min(...arr)
    return arr.every(x <= minVal >= x)
}
checkMinIsLE([-1, 0, 1, NaN])
```

```python
def checkMinIsLE(arr):
    minVal = min(arr)
    return all(minVal <= x for x in arr)

checkMinIsLE([-1, 0, 1, nan])
```

### Dividend equals divisor times quotient

This is the first we learn about division. `D / d = Q` implies `D = Q * d`. Well... no more. This example can only be shown in JavaScript because Python prevents division by zero.

```javascript
function checkDdQ(dividend, divisor){
    quotient = dividend / divisor
    return dividend == quotient * divisor
}
checkDdQ(1, 0)
checkDdQ(1, Infinity)
```

### The square of a value is either greater than or equal to itself or less than one

```javascript
function checkSquareIsGE(x){
    return x*x >= x ||  x*x < 1
}
checkSquareIsGE(NaN)
```

```python
def checkSquareIsGE(x):
    return x*x >= x || x*x < 1

checkSquareIsGE(nan)
checkSquareIsGE(inf)
```

### "Less than or equal to" is equivalent to "Not greater than"

I find this particularly disturbing, not sure why.

```javascript
function checkLEQisNGT(x){
    return (x <= 10) == !(x > 10)
}
checkLEQisNGT(NaN)
```

```python
def checkLEQisNGT(x):
    return x <= 10 and not x > 10

checkLEQisNGT(nan)
```

### A value divided by itself equals one

```javascript
function checkBetweenSelfIsOne(x){
    return x/x == 1
}
checkBetweenSelfIsOne(NaN)
checkBetweenSelfIsOne(Infinity)
```

```python
def checkBetweenSelfIsOne(x):
    return x/x == 1

checkBetweenSelfIsOne(nan)
checkBetweenSelfIsOne(inf)
```

### A value minus itself equals zero

```javascript
function checkMinusSelfIsZero(x){
    return x-x == 0
}
checkMinusSelfIsZero(NaN)
checkMinusSelfIsZero(Infinity)
```

```python
def checkMinusSelfIsZero(x):
    return x-x == 0

checkMinusSelfIsZero(nan)
checkMinusSelfIsZero(inf)
```

### A value times zero equals zero

```javascript
function checkTimesZero(x):
    return x * 0 == 0

checkTimesZero(NaN)
checkTimesZero(Infinity)
```

```python
def checkTimesZero(x):
    return x * 0 == 0

checkTimesZero(nan)
checkTimesZero(inf)
```

---

These last two have an interesting side effect too. One would expect that `1 / (x-x)` and `1 / (x * 0)` to result in Infinity. However, when `x` is Infinity, they result in NaN. Don't you feel dizzy yet?

## Bonus fun fact!

Hey, while working on this article I found something interesting about square roots in Python. As I stated earlier, Python raises an exception if you try to compute the square root of a negative number. But [Python implements complex numbers](https://realpython.com/python-complex-numbers/) natively so if you use the power operator (`**`) instead, it returns a valid result!

```python
>>> from math import sqrt
>>> sqrt(-1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: math domain error
>>> (-1) ** 0.5
(6.123233995736766e-17+1j)
```

The perfect result would have been `(0+1j)` but due to floating-point precision issues, instead of `0` you have a very, very small number. I hope you found it interesting too!

## Conclusion

Semantically sound code is much less prone to errors and reduces the need to be constantly catching exceptions. I hope these examples have served as a reminder that we cannot neglect special numeric values or take for granted many seemingly intuitive properties that, if overlooked, can cause apparently correct code to exhibit undesired behavior.