---
title: How to build a basic REST API in Lua
subtitle: Milua micro framework
date: 2022-05-17
layout: post
highlight: true
---

## Prelude
I recently started a new project, for which I wanted to build a REST API. Here are the alternatives I considered and why I rejected them:
- **Using a framework I'm more familiar with, in a different language, like [Flask](https://flask.palletsprojects.com/en/2.1.x/) for Python**. My project already required Lua and used a bunch of different technologies, so I'd prefer to keep it simple and not add a whole new language and framework to the list.
- **Using an existing framework in Lua, like [Lapis](https://leafo.net/lapis/)**. The problem here was that Lapis relies on third-party software, like Nginx, so the dependencies list would keep growing. This wouldn't be a problem in a more heavy project, but the API I need here is really small, so I would consider overkill anything more than a single technology for it.

## Milua

I felt clearly that what I really wanted was a pure Lua solution. After a bit of research I didn't find any de-facto standard (I might be wrong), but I *did* find a `http` library by [duarnimator](https://github.com/duarnimator) that provided an excellent set of functionalities to launch a simple server in a few lines.

So inspired by the experience of using Flask I made **Milua**

https://github.com/MiguelMJ/Milua

### Installation
I learned how the `luarocks`, a lua package manager, works and published the first version, so you can install it with it's dependencies only with:

```bash
luarocks install milua
```

### Examples
Right after, you can try the example that comes in the repository.
```lua
local app = require "milua"

-- Basic example
app.add_handler(
    "GET",
    "/",
    function()
        return "<h1>Welcome to the handsome server!</h1>"
    end
)

-- Example capturing a path variable
app.add_handler(
    "GET",
    "/user/...", 
    function (captures, query, headers)

        local username = captures[1]
        local times = query.times or 1
        return "The user " .. username .. " is" ..
               (" very"):rep(times) .. " handsome"
    
    end
)

app.start()
```
Launching this would just require you to execute the script after installing Milua. Then, you can test it with `curl`.

```output
$ curl localhost:8800/
<h1>Welcome to the handsome server!</h1> 

$ curl localhost:8800/user/foo
The user foo is very handsome

$ curl localhost:8800/user/foo?times=3
The user foo is very very very handsome
```

### Features
For now, version 0.1 as I write, the `milua` module only offers two functions:
- `add_handler(method, pattern, handler)` to associate a method and a path to a handler.
    - The `handler` function must accept the following arguments:
        - `captures`: An array with the variables fields of the path, specified with three dots (`...`) in the pattern string. In fact, this pattern is just a regular Lua pattern with some syntactic sugar, so you can capture anything you like in your path and be as specific as you want: `/([0-9]+)` would capture a path to a numeric value; `/admin_...` would capture the destination without the prefix `admin_`.
        - `query`: A table with the key-value pairs of the query in the URL (the options that come after the `?`).
        - `headers`: The headers of the HTTP request.
        - `body`: The body of the HTTP request.
    - and must return the following values:
        - The body of the repsonse.
        - (Optional) A table with the headers of the response.
- `start(config)` where config contains the `host` and the `port` to run the application.

## Conclusion
There is still room for a couple of modifications that would keep the complexity at the same level, like adding error handlers (to allow a `404.html` page, for example) or specifying directories for static files. For example, it has no templating functionalities (maybe in a future), but you can require any of your preference and use it in your app. But for now it servers its purpose and it's compatible with anything you want to throw at it, thanks to its minimal nature.
