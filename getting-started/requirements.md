# Requirements

## Hardware

MagicMirror² is developed to run on a Raspberry Pi. It might (and will) run on various different types of hardware, but new versions will only be tested on a Raspberry Pi.

*Electron*, the app wrapper around MagicMirror², only supports the Raspberry Pi 2, 3 & 4. The Raspberry Pi 0/1 is currently **not** supported. If you want to run this on a Raspberry Pi 1, use the [server only](installation.md#server-only) feature and setup a fullscreen browser yourself. (Yes, people have managed to run MM² also on a Pi0, so if you insist, search in the forums.)

## Operating System

Note that you will need to install the latest full version of Raspbian, **don't use the Lite version**.

::: warning NOTE
To run Electron, you need a desktop environment. \
Using a Lite Version of Raspbian **will not work**.
:::

## Node

Although older version of Node might work, we suggest you use Node 12.
