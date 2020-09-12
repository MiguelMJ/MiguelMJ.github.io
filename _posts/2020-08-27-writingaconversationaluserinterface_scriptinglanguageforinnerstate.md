---
layout: post
title: Writing a Conversational User Interface - Scripting Language for Inner State
date: 2020-08-27
author: Miguel MJ
tags: ['\n  -project', '\n  -log', '\n  -jython']
dev_url: https://dev.to/miguelmj/writing-a-conversational-user-interface-scripting-language-for-inner-state-49ll
---
In the last post we made `Pattern`, a class to recognize input and produce output. Now we'll make another one that let us interact with the inner state of the CUI.

As we decided during the design, we will contain and modify the inner state via an embedded scripting language. Java supports [several scripting languages](https://java-source.net/open-source/scripting-languages) and for this project we'll be using [Jython](https://www.jython.org/).

### Jython

As its official page says, _Jython is a Java implementation of Python that combines expressive power with clarity_. Its advantages are that it's super easy to embed in Java and the simplicity of the Python language. The main downside is that the last Python supported version is the 2.7, which is [not currently mantained](https://pythonclock.org/). As this is a hobby project, I won't take that on count, but in a different case I would probably consider another option (e.g. I'd like to embed Lua in the original TASCHE).

#### Embed it to the project

The normal version of Jython requires it installed in your machine, but there is a stand-alone version which runs on its own and can be added as a simple Maven dependency (as we did with Generex in the last part). We'll be using that one.

### Script class

In our library, there are two main purposes for the `Script` class:

1. Check a condition against the inner state.

2. Modify the inner state.



So the structure of this class is pretty straightforward. We have:



- A static reference to the `PythonInterpreter` that contains the inner state.

- A `String` that contains the code of the script.

- A function to evaluate it as a boolean (with the Jython `__nonzero__` function).

- A function to simply execute the code.



### Testing





{% highlight Java linenos %}
// A SUCCESSFUL TEST
Script[] scripts = new Script[10];
Script.pyMachine.exec("a = 5; b=3; c='hola'");
// this should eval true
scripts[0] = new Script("a == 5");
scripts[1] = new Script("b ==3");
scripts[2] = new Script("c[b] == 'a'");
scripts[3] = new Script("'0'");
scripts[4] = new Script("1");
// this should eval false
scripts[5] = new Script("a==b");
scripts[6] = new Script("h=4;False");
scripts[7] = new Script("c[0]=='o'");
scripts[8] = new Script("0");
scripts[9] = new Script("''");
	
boolean ok = true; int i=0;
for(Script s: scripts) {
	boolean ev = s.evaluate();
	ok &= i++ < 5 == ev;
}

{% endhighlight %}



As this class is mainly a wrapper of Jython's `PyCode`, there was little to test but the basic functionality. The only thing worth mentioning is that, as intuitive as it may sound, the state of the `PythonInterpreter` object persists between different `Scripts` executions and evaluations.

_Note that if, in the future, we wanted to have different Conversational Interfaces running with different inner states (be it sequentially or concurrently), we would have to set the static instance before executing/evaluating any script._

### Conclusion

Now with our `Pattern` and `Script` classes we have the basic building blocks to define a structure that associates input and conditions to output and state changes. From now we won't rely much more in third-party libraries (except Gson, which I'll explain).

After we have this structure, we will be able to write dialogue flow examples to test some new features like patterns modifying the inner state and possibly the regex simplification we planned during the design.



Don't forget to check the repository for the code!




