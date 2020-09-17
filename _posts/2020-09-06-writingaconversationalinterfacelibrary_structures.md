---
layout: post
title: Writing a Conversational Interface Library - Structures
date: 2020-09-06
author: Miguel MJ
tags: ['\n  -project', '\n  -log', '\n  -java', '\n  -chatbot']
dev_url: https://dev.to/miguelmj/writing-a-conversational-interface-library-structures-1806
---
The classes we've got right now are `Pattern`, for matching input and producing output, and `Script` for checking and modifying the inner state of the CUI. With these two, we want to make a structure that:

1. Receives user input.
2. Matches it against a pattern.
3. Checks a condition in the inner state.
4. If the input matches and the condition is satisfied, it either:
  - **a)** Produces some output and executes a change in the state. 
  - **b)** Processes the input further until it gets to produce an output or discard the response.


#### Some notation

- We will call **question** to the user input, that the `Response` tries to match.
- Given a question, a `Response` is **valid** when the question matches the input pattern and the condition is satisfied.



### The `Response` class

We'll make a base `Response` class, which performs the first three steps and `SimpleResponse` and `RecursiveResponse`, that derive from it and implement an `answer` function, respectively for a options **a)** and **b)**.



![Response hierarchy](https://dev-to-uploads.s3.amazonaws.com/i/hldnz786g1lm9u4m0zr2.png)



_Note that the return type of the `answer` function is an `Optional`, because if the `question` is not valid, the function should not return anything._

#### Valid responses



{% highlight Java linenos %}
public boolean isValid(String question) {
  return (input == null     || input.matches(question)) &&
         (condition == null || condition.evaluate());
}

{% endhighlight %}



We will use null input patterns for responses that should adapt to any question and null conditions for responses that should not depend on the inner state.

#### Simple response

The algorithm that `SimpleResponse` uses to answer a question is:



{% highlight Java linenos %}
public Optional<String> answer(String question) {
    Optional<String> ans = Optional.empty();
    if(isValid(question)){
        ans = Optional.of(output.generate());
        if(execute != null) execute.execute();
    }
    return ans;
}

{% endhighlight %}



The `execute` script doesn't need to be present, but the output pattern can't be null, as something needs to be returned, even if it's an empty string.



#### Recursive Response

The algorithm used by a `RecursiveResponse`, instead, is:



{% highlight Java linenos %}
public Optional<String> answer(String question) {
    Optional <String> ans = Optional.empty();
    if(isValid(question)) {
        if(new_question != null) {
            question = new_question;
        }
        for(Response response : responses) {
            ans = response.answer(question);
            if(ans.isPresent()) break;
        }
    }
    return ans;
}

{% endhighlight %}



In this case, the first sub-response able to answer the question will be the only one returned. This could be tweaked later, to enable recursive responses that append all possible answers, but for now we'll leave it this way.



### The `Module` class

We may want a default value for certain variables the first time we check a condition or define some useful functions to avoid repeating code. The `Module` class will be used to group a set of responses that can be related or use the same variables of the inner state, and also include a initialization script to run before any of its `Response`s is used.



![Module class](https://dev-to-uploads.s3.amazonaws.com/i/qgqvo6t4zekbzme3dgrp.png)



The `answer` method behaves the same way as the one from `RecursiveResponse`.



### The `CUI` class 

At last, we can create the CUI class, which is no more than a collection of `Module`s and a `PythonInterpreter` to set the static reference of the `Script`, which we explained in [the last part](https://dev.to/miguelmj/writing-a-conversational-user-interface-scripting-language-for-inner-state-49ll#script-class).



![CUI class](https://dev-to-uploads.s3.amazonaws.com/i/hlyqq2349s0fp0g7t2id.png)



The `answer` function in this class doesn't return a `Optional` because defaults any response to an empty string, and appends the result of calling `answer` on every one of its modules when they don't return an empty `Optional`.



### Conclusion

Now we have the structures and the logic necessary for the basic functionality of our library! The following step to take will be to implement the serialization and deserialization of these structures, which will be done to a JSON format via the GSON library.



The real code is on GitHub, if you want to check it and star the project if you like it!




