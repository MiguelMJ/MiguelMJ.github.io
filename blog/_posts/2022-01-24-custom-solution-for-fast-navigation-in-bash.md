---
title: Custom solution for fast navigation in Bash
date: 2022-01-24
layout: post
highlight: true
---
Using the console, you have to `cd` your way through all your directories, which thanks to autocompletion, can be a relatively fast. However, sometimes you have to work with very deep folder structures, with not autocompletion-friendly folder groups and processes that require you to navigate them a lot. As this has been my case for the last few months, I finally decided to make a tool to solve this and reduce the amount of keystrokes spent in `cd` navigation.

This tool is a small bash function called `ws`, short for *workspace*. You can find it [**here**](https://gist.github.com/MiguelMJ/b56f58d490826cddf8243672e6248aee). Paste it at the end of your `~/.bashrc` or your source file of choice to use it.

## Description and usage

For `ws`, a workspaces is a set of directories, each one associated to a numeric ID. You can define as many workspaces as you want, and activate different ones for each open terminal.

Some examples will be more illustrative than any wall of text:

```bash
# Create the workspace itself
$ ws -s my_workspace

# Populate it with directories
$ cd /path/to/foo/dir
$ ws -a
$ cd /path/to/bar/dir
$ ws -a
$ cd /path/to/baz/dir
$ ws -a

# Check the directories in your workspace
$ ws -l
Workspace my_workspace:
  1 /path/to/foo/dir
  2 /path/to/bar/dir
  3 /path/to/baz/dir

# Move to a directory in your workspace
$ ws 2
/path/to/bar

# See a list of available workspaces
# The active one is marked with >
$ ws -s -l
Workspaces:
- default
> my_workspace

# Remove a directory from a workspace
$ ws -r 2
$ ws -l
Workspace my_workspace:
  1 /path/to/foo/dir
  2 /path/to/baz/dir

# Remove a workspace
# If it is the current, then the default one is activated
$ ws -s -r my_workspace
$ ws -s -l
Workspaces:
> default
```
The only downside is that you'll have to remember the IDs of each directory to use it fluently, but this shouldn't be a problem if you end up using it a lot. Also, remember to check that you are using the correct workspace before you start to work; it will remember it if the `tty` is the same. 

