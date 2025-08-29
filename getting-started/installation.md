# Installation & Usage

The MagicMirror² can be installed manually or using automatic installers. At the
start of 2020 the decision was made to remove the automatic installer from the
MagicMirror² core repository and move it to a community maintained separate
repository. For more information about this decision, please check issue
[#1860](https://github.com/MagicMirrorOrg/MagicMirror/issues/1860) on GitHub.

Therefore the only officially supported way of installation is by using a
[manual installation](#manual-installation). Using external installation scripts
is at your own risk but can make the process a lot easier. Available automatic
installers can be found under:
[alternative installation methods](#alternative-installation-methods).

## Manual Installation

These instructions deploy a standalone version of MagicMirror², for
[Server Only](/getting-started/installation.md#server-only) and
[Client Only](/getting-started/installation.md#client-only) installs please read
the install specific instructions below

1. Download and install a
   [required](https://github.com/MagicMirrorOrg/MagicMirror/releases) _Node.js_
   version, see the official documentation:
   - [Linux based distributions](https://github.com/nodesource/distributions)
   - [Others](https://nodejs.org/en/download)
2. check if `git` is installed on your machine by executing `git` (should show
   usage), otherwise install it
3. Clone the repository:
   `git clone https://github.com/MagicMirrorOrg/MagicMirror`
4. Enter the repository: `cd MagicMirror`
5. Install the application: `node --run install-mm`
6. Make a copy of the config sample file:
   `cp config/config.js.sample config/config.js`
7. Start the application: `node --run start`

::: warning NOTE

The installation step for `node --run install-mm` will take a very long time,
often with little or no terminal response! For the RPi3 this is **~10** minutes
and for the Rpi2 **~25** minutes. Do not interrupt or you risk getting a
:broken_heart: by Raspberry Jam.

:::

## Alternative Installation Methods

The following installation methods are not maintained by the MagicMirror² core
team. Use these scripts and methods at your own risk.

### Automatic Installation Scripts

- Sam (@sdetweil, long time contributor of the MagicMirror² framework) maintains
  an easy-to-use installation and update script:
  [https://github.com/sdetweil/MagicMirror_scripts](https://github.com/sdetweil/MagicMirror_scripts)
- [The MagicMirror Package Manager](https://github.com/Bee-Mar/mmpm) is a
  command line interface designed to simplify the installation, removal, and
  maintenance of MagicMirror modules.

### Docker Image

- MagicMirror² can be deployed using [Docker](https://docker.com). Head over to
  [this repository](https://gitlab.com/khassel/magicmirror) for more
  information.

### Kubernetes Helm Chart

- If you want to run MagicMirror² (in server only mode) in a kubernetes cluster
  then take a look at this
  [MagicMirror Helm Chart](https://gitlab.com/khassel/magicmirror-helm).

### MagicMirrorOS

- This is a full OS based on Raspberry Pi OS. So instead of downloading
  Raspberry Pi OS and putting this on your sd card, you can use
  [MagicMirrorOS](https://github.com/guysoft/MagicMirrorOS) instead. It runs out
  of the box with a default setup of MagicMirror, under the hood it uses the
  [docker setup](https://gitlab.com/khassel/magicmirror).

### NPM

- We also publish the latest version of MagicMirror to the
  [npm-registry](https://www.npmjs.com/package/magicmirror).

## Usage

Note the following:

- If you want to debug on your Raspberry Pi you can use `node --run start:dev`
  which will start MM with _Dev Tools_ enabled.
- To access the toolbar menu when in mirror mode, hit `ALT` key.
- To toggle the (web) `Developer Tools` from mirror mode, use `CTRL-SHIFT-I` or
  `ALT` and select `View`.

### Server Only

In some cases, you want to start the application without an actual app window.
To do so after installation you can start MagicMirror² in server only mode by
manually running the following command within the MagicMirror directory
`node --run server`

::: warning IMPORTANT

please read the information below on fully setting up MagicMirror² for running
in server only mode otherwise you wont be able to connect to your MagicMirror²
server from a remote device

:::

In order to run MagicMirror² in server mode you need to:

- Allow Remote Connections to MagicMirror²
- Start MagicMirror² in Server mode on boot

#### Allow Remote Connections to MagicMirror²

By default MagicMirror² does not allow other remote devices to connect, this is
controlled by settings inside the `config/config.js` file by interface and ip

- change address to `0.0.0.0` this will allow MagicMirror² to listen on all
  network interfaces
- change `ipWhitelist` to the list of IP's you want to allow to connect

Sample Configuration below
[and link to full configuration options](/configuration/introduction.md#introduction)

```js
let config = {
	address: "0.0.0.0",	// default is "localhost"
	port: 8080,		// default
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:172.17.0.1"], // default -- need to add your IP here
	...
};
```

### Client Only

This is when you already have a server running remotely and want your RPi to
connect as a standalone client to this instance, to show the MagicMirror² from
the server.

You can start MagicMirror² in client mode by manually running the following
command with the MagicMirror directory:
`node clientonly --address 192.168.1.5 --port 8080`

### Wayland

If you use Wayland. Run `node --run start:wayland` instead of `node --run start`
to start.

### Windows

::: warning IMPORTANT

MagicMirror² is designed to run on Linux. But with a different start command,
you can also run it on Windows. Some third-party modules may not work on
Windows.

:::

In Windows you must use `node --run start:windows` instead of
`node --run start`.
