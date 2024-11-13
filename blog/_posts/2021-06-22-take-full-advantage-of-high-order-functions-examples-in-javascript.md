---
title: Take full advantage of high order functions
subtitle: Examples in Javascript
date: 2021-06-22
layout: post
highlight: true
---
Functions are more than just a way to avoid repetition in your code. The powerful concepts of functions as objects that can be manipulated and altered in runtime will improve the flexibility and scalability of your applications. Learn to use and write high order functions to raise the quality of your work.

## Introduction
### Functions as subroutine vs Functions as stored computations

From a simplified perspective, functions are used to reduce repetition of code, separating some logic that accepts parameters and might (or not) return a value. However, from mathematics and the paradigm of functional programming, we get a more powerful concept of function, as an applicable computation.

What’s interesting about this subtle difference is that a computation can be stored as data too. In some dynamic languages like Javascript and Python, this means that you can manipulate functions as objects, as what’s called first class citizens.

### What are higher order functions?

In short, high order functions are the ones that use other functions as objects.

- Functions that take other functions as parameters.
- Functions whose return value is another function.

![Higher function schema](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/votslcco1e55ocah286i.png) 

## Some use cases for higher order functions

> Before we go on, a quick remainder that the `x => y` syntax is equivalent to `function(x){ return y }`.

### Set additional constraints to existing functions

Example: Function to limit the range of another function’s output.

```js
const clampedFunc = function(fun, min, max){
    return (...args) => Math.max(min, Math.min(max, fun(...args)))
}

// Demonstration
squared1 = x => x*x
squared2 = clampedFunc(squared1, 25, 100)

squared1(3) // 9
squared1(6) // 36
squared1(12) // 144

squared2(3) // 25
squared2(6) // 36
squared2(12) // 100
```

### Create other  functions with same logic but different parameters

Example: Function to create linear functions.

```js
const linear = function(m, n){
    return (x) => m*x + n
}

// Demonstration
f1 = linear(1, 2)
f1(10) // 12
f1(20) // 22

f2 = linear(2, -5)
f2(7) // 9
f2(8) // 11
```

### Use another function within a data structure

This is actually the most common use case. In fact, most modern languages have this kind of functions in their standard libraries. We’re going to see some in the next section.

## Higher order functions for lists

- `forEach`: Apply a function to each element of the list and ignore the return values, if any.
- `map`: Apply a function to each element of the list and return a list of all returned values. In other languages it’s called apply.
- `reduce`: Apply a function of two arguments to the two first elements. Then, apply it again to the result and the third element. Then, apply it to the result and the fourth element, etc. In short, accumulate the value of a function for all the elements.  In other languages it’s called fold.

![Schema of forEach, map and reduce](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q9633juvv89gyzluqezj.png) 

For the following, a condition means a function that returns a boolean value.

- `some`: Return true if at least one element satisfies a condition. In other languages it’s called any.
- `every`: Return true if all elements of the list satisfy a condition.
- `filter`: Return a list only with the elements that satisfy the condition.

Examples:

```js
nums = [ 1, 2, 3, 4, 5 ]
words = [ 'how', 'are', 'you' ]

nums.forEach(x => console.log("- " + x))
// returns nothing but prints nums as a bullet list
nums.map( x => x*3 )
// [ 3, 6, 9, 12, 15 ]
words.reduce( (x, y) => x + ' ' + y )
// 'how are you'
nums.some( x => x > 5 )
// false
words.every( x => x.length == 3 )
// true
nums.filter(x => x % 2 == 0)
// [ 2, 4 ]
```
 
## Complete example

Let’s apply all we have learned to a single case.

```js
// Function to concatenate other two functions (this is called composition)
const compose = function (f1, f2){
    return (...args) => f2(f1(...args))
}
// Function to compose any number of functions (general composition)
const gCompose = function(fs){
    return fs.reduce(compose)
}
// Function to generate custom formatter functions
const custom_fmt = function(text, variable){
    return (value) => text.replace(variable, value)
}
// Convert USD to Euros
const usd2eur = function(x){
    return x/1.2
}
// Fix the precision a number to 2
const fix2 = function(x){
    return x.toFixed(2)
}

// Store the functions in the order we want to apply them
myComputation = [usd2eur, fix2, custom_fmt("Cost in EUR: x", "x")]
// Compose them into a single function
myComputationFunc = gCompose(myComputation)
// Apply the computation we just created to each element of our list and print the result
usdCosts = [2.50, 10.99, 3.3, 5.72]
usdCosts.map(myComputationFunc).forEach(x => console.log('-',x))

/* Console output
- Cost in EUR: 2.08
- Cost in EUR: 9.16
- Cost in EUR: 2.75
- Cost in EUR: 4.77
*/
```

## Conclusion

For a small example, this approach is somewhat excessive, but illustrative. It is important to know how high order functions work and what possibilities they offer:

- Minimize the use of loops and branches in your code, improving legibility.
- Help you abstract and generalize processes, making the program more flexible and scalable.
- Reduce the code of large applications with atomic computations applied to data that might require more or less processing or where the required transformations change during execution.

