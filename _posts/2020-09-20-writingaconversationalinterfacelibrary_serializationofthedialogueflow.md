---
layout: post
title: Writing a Conversational Interface Library - Serialization of the dialogue flow
date: 2020-09-20
author: Miguel MJ
tags: ['\n  -project', '\n  -log', '\n  -java', '\n  -chatbot']
dev_url: https://dev.to/miguelmj/writing-a-conversational-interface-library-serialization-of-the-dialogue-flow-1llm
---
In the last post we defined the structures which contain the logic and data for the basic behaviour of a Conversational User Interface, which were `SimpleResponse`, `RecursiveResponse`, `Module` and `CUI`. But unless we want to hard code their content in every application, we need to serialize and deserialize them.



### GSON



We are going to store our data in JSON format, so we'll make use of the [GSON](https://github.com/google/gson) _a Java serialization/deserialization library to convert Java Objects into JSON and back_, devolped by Google. As we did before with Generex and Jython, we just have to add the dependency to the `pom.xml` file of our Maven project and it will be ready to use.



GSON is a flexible and powerful library that could take [more than one post](https://www.tutorialspoint.com/gson/index.htm) to explain. Honestly, I didn't dive much into it, so I'm pretty sure there are better ways to do what I'm about to explain, but my task was not that complicated, so this solution is still flexible and open to future adaptations.



## Intermediate classes for serialization



Due to their complexity, our `Response` and `Module` classes can't be serialized directly by GSON, so the simplest way I came up with to deal with that was to make a serializable version of each one (`SerializableResponse` and `SerializableModule`) as an intermediary. 



### `SerializableResponse`



This class just holds the `String` version of all possible attributes from each child of `Response`, which are:





{% highlight Java linenos %}
class SerializableResponse{
  public String input; // both
  public String output; // SimpleResponse
  public String condition; // both
  public String execute; // SimpleResponse
  public String new_question; // RecursiveResponse
  public List<SerializableResponse> responses; // RecursiveResponse

  public Response getResponse(){...}
}

{% endhighlight %}





#### Java to JSON



The `Response` class needs a new abstract function `SerializableResponse serializable()` that will be implemented for each child and only has to fill each attribute of the serializable calling `toString()`.



**Note** that:



- In the case of the `Script`s, `PyCode` from Jython doesn't keep the code string, so we have to modify our class to do it in order to return it in its `toString` function.

- In the `RecursiveResponse` attribute `responses` this is a recursive call.



Now to serialize a `Response` we only need to do:



{% highlight Java linenos %}
jsonString = gson.toJson(myResponse.serializable());

{% endhighlight %}





#### JSON to Java



Now we use the `SerializableResponse` kind of like a factory, with a function `Response getResponse()`. The only thing we have to do to discern wehter  to return a `SimpleResponse` or a `RecursiveResponse` is:





{% highlight Java linenos %}
// SerializableResponse getResponse
if (this.output != null){ // SimpleResponse (we allow this.execute to be null)
  // build a SimpleResponse with the string attributes
  // and return it
}else if(this.responses != null){ // RecursiveResponse (we allow new_question to be null)
  // build a RecursiveResponse with the string attributes
  // and return it
}else{
  // error
}

{% endhighlight %}

 

And so, to deserialize a `Response` we only have to:



{% highlight Java linenos %}
Response myResponse = gson(jsonString ,SerializableResponse.class).getResponse();

{% endhighlight %}





### `SerializableModule`



As you may be already expecting, this class is just a list of `SerializableResponse`s and a single additional `String` for the initialization script.





{% highlight Java linenos %}
class SerializableModule{
  public String init;
  public List<SerializableResponse> responses;
}

{% endhighlight %}





And the remaining logic to serialize and deserialize is similar to the explained previously.



## Load and save a `CUI`



With the logic to convert `Modules` to JSON and back, the function to load and save modules would take just a few lines. The only thing we still cannot load nor store yet would be the inner state, so for now our conversational applications won't keep any memory between sessions.



## Let's see a basic example





{% highlight JSON linenos %}
{
"init":"greeted=False",
"responses":[{
          "input":"(hello|hi)!*",
          "responses":[{
                  "condition":"not greeted",
                  "output":"Hi(, traveler)?",
                  "execute":"greeted = True"
              },
              {
                  "output":"Hello(, again|there)"
              }]
          }]
}

{% endhighlight %}





 Possible exchange:





{% highlight None linenos %}
User: hi!!
Bot: Hi, traveler
User: hello
Bot: Hello there
user: hello!!!
Bot: Hello, again

{% endhighlight %}





## Conclusion



Finally we have covered what's necessary to define functional dialogue flows and test new features. From now on, all we'll do is extend what we have, because as the example shows, the scope of what this library offers is very limited compared to what we can still make.



The next step to take is to implement variables, so we can access and temporally modify the inner state directly from the `Pattern` class, in order to interpret the user input more intelligently. For this, we I will be explaining more advanced features of the regular expressions in Java.



You can check the code in GitHub, give it a star if you like it and see the documentation in [my new website](miguelmj.github.io/projects/JTASCHE.html).




