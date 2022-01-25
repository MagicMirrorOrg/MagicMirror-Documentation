# Installation & Usage

The Magic Mirror can be installed manually or using automatic installers. At the start of 2020 the decision was made to remove the automatic installer from the MagicMirror² core repository and move it to a community maintained separate repository. For more information about this decision, please check issue [#1860](https://github.com/MichMich/MagicMirror/issues/1860) on GitHub.

Therefore the only officially supported way of installation is by using a [manual installation](#manual-installation). Using external installation scripts is at your own risk but can make the process a lot easier. Available automatic installers can be found under: [alternative installation methods](#alternative-installation-methods).

## Manual Installation
1. Download and install the latest *Node.js* version:
- `curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -`
- `sudo apt install -y nodejs`
2. Clone the repository and check out the master branch: `git clone https://github.com/MichMich/MagicMirror`
3. Enter the repository: `cd MagicMirror/`
4. Install the application: `npm install`
5. Make a copy of the config sample file: `cp config/config.js.sample config/config.js`
6. Start the application: `npm run start` \
   For **Server Only** use: `npm run server` .

::: warning NOTE
The installation step for `npm install` will take a very long time, often with little or no terminal response! For the RPi3 this is **~10** minutes and for the Rpi2 **~25** minutes. Do not interrupt or you risk getting a :broken_heart: by Raspberry Jam.
:::

## Alternative Installation Methods
The following installation methods are not maintained by the MagicMirror² core team. Use these scripts and methods at your own risk.

### Automatic Installation Scripts
- Sam (@sdetweil, long time contributor of the MagicMirror² framework) maintains a easy to use installation and update script: [https://github.com/sdetweil/MagicMirror_scripts](https://github.com/sdetweil/MagicMirror_scripts)
- [The MagicMirror Package Manager](https://github.com/Bee-Mar/mmpm) is a command line interface designed to simplify the installation, removal, and maintenance of MagicMirror modules.

### Docker Image
- MagicMirror² can be deployed using [Docker](https://docker.com). Head over to one of the following repositories for more information:
  - [Docker Setup by khassel](https://gitlab.com/khassel/magicmirror)
  - [Docker Setup by bastilimbach](https://github.com/bastilimbach/docker-MagicMirror) (currently unmaintained, only `server only` mode)

### Kubernetes Helm Chart
- If you want to run MagicMirror² (in server only mode) in a kubernetes cluster then take a look at this [MagicMirror Helm Chart](https://gitlab.com/khassel/magicmirror-helm).

### MagicMirrorOS
- This is a full OS based on Raspbian. So instead of downloading Raspbian and putting this on your sd card, you can use [MagicMirrorOS](https://github.com/guysoft/MagicMirrorOS) instead. It runs out of the box with a default setup of MagicMirror, under the hood it uses an [alternative docker setup](https://gitlab.com/khassel/magicmirror) (which allows direct output on the raspberry screen).

## Other Operating Systems

### Windows: 

To get the MagicMirror software running on Windows, you have to do two things in addition to the [steps](#manual-installation) above:

4a. Install dependencies in the vendor and font directories:

  Powershell:
  
  1. `cd fonts; npm install; cd ..`
  2. `cd vendor; npm install; cd ..`
    
  Command Prompt:
  
  1. `cd fonts && npm install && cd ..`
  2. `cd vendor && npm install && cd ..`
    
Otherwise the screen will stay black when starting the MagicMirror.

5a. Fix the start script in the `package.json` file:

  1. Navigate to the file `package.json`
  2. Find where it says 
	  ```
	  "start": "DISPLAY=\"${DISPLAY:=:0}\" ./node_modules/.bin/electron js/electron.js",
	  "start:dev": "DISPLAY=\"${DISPLAY:=:0}\" ./node_modules/.bin/electron js/electron.js dev",  
	  ```
  3. and replace it with 
	  ```
	  "start": ".\\node_modules\\.bin\\electron js\\electron.js",
	  "start:dev": ".\\node_modules\\.bin\\electron js\\electron.js dev",
	  ``` 

Otherwise the program won't start, but will display this error message: 
`"'DISPLAY' is not recognized as an internal or external command, operable program or batch file."`

## Usage
Note the following:

- `npm start` does **not** work via SSH. But you can use `DISPLAY=:0 nohup npm start &` instead. \
  This starts the mirror on the remote display.
- If you want to debug on your Raspberry Pi you can use `npm run start:dev` which will start MM with *Dev Tools* enabled.
- To access the toolbar menu when in mirror mode, hit `ALT` key.
- To toggle the (web) `Developer Tools` from mirror mode, use `CTRL-SHIFT-I` or `ALT` and select `View`.

### Server Only

In some cases, you want to start the application without an actual app window. In this case, you can start MagicMirror² in server only mode by manually running `npm run server` or using Docker. This will start the server, after which you can open the application in your browser of choice. Detailed description below.

::: warning IMPORTANT
Make sure that you whitelist the interface/ip (`ipWhitelist`) in the server config where you want the client to connect to, otherwise it will not be allowed to connect to the server. You also need to set the local host `address` field to `0.0.0.0` in order for the RPi to listen on all interfaces and not only `localhost` (default).
:::

```javascript
let config = {
	address: "0.0.0.0",	// default is "localhost"
	port: 8080,		// default
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:172.17.0.1"], // default -- need to add your IP here
	...
};
```

### Client Only

This is when you already have a server running remotely and want your RPi to connect as a standalone client to this instance, to show the MM from the server. Then from your RPi, you run it with: `node clientonly --address 192.168.1.5 --port 8080`. (Specify the ip address and port number of the server)
