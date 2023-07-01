# Requirements

## Hardware

MagicMirror² is developed to run on a Raspberry Pi. It might (and will) run on various different types of hardware, but new versions will only be tested on a Raspberry Pi.

_Electron_, the app wrapper around MagicMirror², only supports the Raspberry Pi 2, 3 & 4. The Raspberry Pi 0/1 is currently **not** supported. If you want to run this on a Raspberry Pi 1, use the [server only](installation.md#server-only) feature and setup a fullscreen browser yourself. (Yes, people have managed to run MM² also on a Pi0, so if you insist, search in the forums.)

## Operating System

You will need to install the latest full version of [Raspberry Pi OS](https://www.raspberrypi.com/software/)
(previously called Raspbian).

If you want to run the software on other Operating Systems, take a look at [this section](/getting-started/installation.html#other-operating-systems)

::: warning NOTE
You **do** need a desktop environment to run Electron!

Using a Lite Version of Raspberry Pi OS **will not work**.

Raspberry Pi OS versions based on Debian "Stretch" are also no longer supported.
:::

## Node

Although older version of Node might work, we suggest you use Node 18.
