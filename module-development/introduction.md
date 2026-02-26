---
title: Introduction
---

# Module Development Documentation

This documentation describes the way to develop your own MagicMirror² modules.

## General Advice

As MagicMirror² has gained huge popularity, so has the number of available
modules. For new users and developers alike, it is very time-consuming to
navigate around the various repositories in order to find out what exactly a
certain modules does, how it looks and what it depends on. Unfortunately, this
information is rarely available, nor easily obtained without having to install
it first. Therefore, **we highly recommend you to include the following
information in your README file.**

- A high quality screenshot of your working module
- A short, one sentence, clear description what it does (duh!)
- What external API's it depends upon, including web links to those
- Whether the API/request require a key and the user limitations of those. (Is
  it free?)
- **Do not use `new Date()` for the current timestamp, instead prefer
  `new Date(Date.now())` as it can be more
  [easily overridden for debugging](/core-development/debugging#date)**.

Surely this also help you get better recognition and feedback for your work.

## Module name

We recommend the following pattern: `MMM-MyNewCoolModule`. But it is not
mandatory - your module will also work with other name patterns (as long as no
other module has the same name).

## Quick start

To rocket launch your module, you can use the
[MMM-Template](https://github.com/Dennis-Rosenbaum/MMM-Template) or immediately
[MMM-Template](https://github.com/new?template_name=MMM-Template&template_owner=Dennis-Rosenbaum).
Please read the
[MMM-Template wiki](https://github.com/Dennis-Rosenbaum/MMM-Template/wiki) for
more information.

**Please note!** This module is an externally developed module and not
maintained by the MagicMirrorOrg.

## Module structure

We have 2 folders. The default modules are grouped together in the
`defaultmodules` folder. All other modules should be placed in a subfolder of
`modules`. Note that any file or folder you create in the `modules` folder will
be ignored by git, allowing you to upgrade the MagicMirror² without the loss of
your files.

A module can be placed in one single folder. Or multiple modules can be grouped
in a subfolder. Note that name of the module must be unique. Even when a module
with a similar name is placed in a different folder, they can't be loaded at the
same time.

### Files

- **modulename/modulename.js** - This is your core module script.
- **modulename/node_helper.js** - This is an optional helper that will be loaded
  by the node script. The node helper and module script can communicate with
  each other using an integrated socket system.
- **modulename/public** - Any files in this folder can be accessed via the
  browser on `/modulename/filename.ext`. **Note:** This requires the module to
  have a `node_helper.js` file. If your module doesn't need a node helper for
  anything else, an empty stub is enough:
  ```js
  const NodeHelper = require("node_helper");
  module.exports = NodeHelper.create({});
  ```
- **modulename/anyfileorfolder** Any other file or folder in the module folder
  can be used by the core module script. For example:
  _modulename/css/modulename.css_ would be a good path for your additional
  module styles.

## Further reading

Deepwiki provides a complementary, high‑level view of MagicMirror — architecture
map, component interactions, and codebase hot spots — it may help you to gain a
deeper understanding, spot extension points, and debug faster. See the
[Deepwiki overview of MagicMirror](https://deepwiki.com/MagicMirrorOrg/MagicMirror/).

This independent, third-party, AI generated documentation and analysis is not
authored by the MagicMirror team — use it with a critical eye.
