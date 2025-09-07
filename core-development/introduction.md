---
title: Introduction
---

# Core Development Documentation

This documentation describes core MagicMirror² development.

## General

MagicMirror² is a community-driven development effort, and [contributions](../about/contributing.md) are
welcome!

In general, new features and bug fixes should be tracked against an [issue in the MagicMirror repo](https://github.com/MagicMirrorOrg/MagicMirror/issues).
It is always a good idea to search existing issues to see if a problem you're experiencing has already been reported,
or if someone has already suggested a feature you'd like to propose. Creating or finding an issue also starts the
discussion and helps build consensus around your proposed fix or feature.

The MagicMirror² core is [developed on GitHub](https://github.com/MagicMirrorOrg/MagicMirror/) out of the
*develop* branch. To begin developing MagicMirror² core, please fork the GitHub project and
create a new branch based off of the *develop* branch.

When your development is ready for review and testing, create a new *Pull Request* targeting the *develop* branch.
The development team and other contributors will be able to review your changes and provide feedback, and
the test system will run automated tests against your changes. Make sure to mention the issue(s) that your Pull
Request solves.

## Development Environment

Although Node.js applications are typically platform-independent, many of the scripts created for MagicMirror² are
Linux-based. While Windows/Mac development is possible, you may run into issues. (Improvements here are welcome!)

You will need to have [Node.js installed](https://nodejs.org/en/download). When doing Linux development, on newer
distributions Node.js is available from package managers.

Many Node.js or experienced Javascript developers have an environment that works for them. New developers
to Node.js / Electron can download [VSCode for free](https://code.visualstudio.com/download) and use many extensions available for debugging and developing Javascript.

Also checkout [Building Node.js Apps with VSCode](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial).
