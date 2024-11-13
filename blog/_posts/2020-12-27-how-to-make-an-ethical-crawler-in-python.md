---
layout: post
title: How to make an ethical crawler in Python
date: 2020-12-27
highlight: true
---
**Web crawling** or **web scraping** is the automation of the access to one or more websites, in order to extract (scrape) data from them. With a high level language like Python, it can even be done easily, but there are some considerations to be taken into account.

I assume you know what web crawling is and have basic knowledge about how to make http requests in Python.

## Practise ethical web scraping

There's a risk in web scraping: it can be harsh for web servers. Automated requests can saturate them, so **it's not rare that administrators put some measures to prevent scraping in their sites**, to the point of blocking certain user agent or IP address. For this reason, it is very important to do it carefully. 

Our solution will be a `get` function to wrap `requests.get`  and implement some respectful practices.

## Imports

Here are the main libraries that we will use in our ethical web crawler.

```python
import pathlib  # to manage the filesystem
import requests # to make http requests
from time import sleep # for the delays

from urllib.robotparser import RobotFileParser # to parse robots.txt
from urllib.parse import urlparse # to parse urls
```

## False Responses

First of all, we need a new class to replace HTTP responses in some cases. For our needs, we will only give it the fields of `status_code` and `content`.

```python
class FalseResponse:
    def __init__(self, code, content):
        self.status_code = code
        self.content = content
```


## Make sure you are allowed

We also need to write a function `ask_robots` to check the [robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) file of the site before a petition. This way we know if the admins allow our bot to crawl a specific url. We will keep visited files in `_rp` in case we check the same robots.txt more than once.

```python
_rp = {}

def ask_robots(url: str, useragent="*": str) -> bool:
    url_struct = urlparse(url)
    base = url_struct.netloc
    # look up in the cache or update it
    if base not in _rp:
        _rp[base] = RobotFileParser()
        _rp[base].set_url(url_struct.scheme + "://" + base + "/robots.txt")
        _rp[base].read()
    return _rp[base].can_fetch(useragent, url)
```
The default useragent is `"*"`, which looks for rules applied to all crawlers (sometimes specific crawlers have specific rules).
## The `get` function

Now we have what we need to specify our main function.

I will write each chunk of the function followed by a little explanation.

### Arguments

```python
def get(url: str, use_cache=True: bool, delay=2: int):
    useragent = "My Crawler"
```

1. `url`. The URL you want to get.
2. `use_cache`. Flag to allow the program to reuse previous responses instead of making a new one.
3. `delay`. Time in seconds to wait before a request, to avoid saturating the servers if we make more than one. 

### Check your own cache

```python
    # If a cached answer exists and is acceptable, then return the cached one.
    url_cache = pathlib.Path.cwd() / "cache" / url.replace("/", "_")
    if use_cache and url_cache.exists():
        with open(url_cache, "r") as fh:
            res = fh.read().replace("\\r\\n", "")
        return FalseResponse(200, res)
```

If the user has allowed the program to use a cached response, then look up a directory called `cache` where the previous responses are stored and return that.

### Ask the robots.txt

```python
    # If the robots.txt doesn't allow the scraping, return forbidden status
    if not ask_robots(url, useragent):
        return FalseResponse(403, "robots.txt forbids it")
```

Now we use the function we defined earlier. If the robots.txt file excludes the desired URL, we use a status code of `403`, to express that although the content exists, the retrieval is not allowed for this user (in this case, the crawler).

### Wait and make the request

```python
    # Make the request after the specified delay
    headers = {"User-Agent": useragent}
    sleep(delay)
    res = requests.get(url, timeout=10, headers=headers)

```

We identify our crawler before making the request using the User-Agent header and wait the specified time before it. 

### Stop if told so

```python
    # Exit the program if the scraping was penalized
    if res.status_code == 429:  # too many requests
        exit()

```

Overwhelmed servers may return a code `429` to tell you that you have done too many requests in too little time. Usually these responses include a `Retry-After` header to tell us how much to wait before a new request. You can use it to try again, but to keep this example simple, we just exit the program. 

### Store the response and return it

```python
    # Cache the response if allowed by user
    if use_cache:
        url_cache.parent.mkdir(parents=True, exist_ok=True)
        with open(url_cache, "w") as fh:
            fh.write(res.content.decode(res.encoding))

    return res
```

Again, if the user allowed the use of a cache, we write to it using the same path as before.

## Conclusion

This is a generic approach, but it can be used as a base for crawlers with more concrete needs.

This way, we avoid forbidden scraping, unnecessary redundant petitions and optimize traffic. If you practise ethical web-scraping, you will make the work of maintainers easier and will be able to scrape your data with a clean conscience.

## Reference

[A Guide to Ethical Web Scraping](https://www.empiricaldata.org/dataladyblog/a-guide-to-ethical-web-scraping) 