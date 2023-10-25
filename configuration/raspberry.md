# Raspberry Specific

This information here is based on the latest release of 
[Raspberry Pi OS](https://www.raspberrypi.com/software/operating-systems/) from October 10th 2023.

## Adding colored icons

Raspberry Pi OS does not come with colored emoji icons by default. To add them, install the following package:

```shell
sudo apt install fonts-noto-color-emoji
```

## Enable the Open GL driver to decrease Electron's CPU usage.


## Rotating the screen and hide Rainbow colored cube

Option 1: Screen Configuration Tool

Option 2: Command line https://pimylifeup.com/raspberry-pi-rotate-screen/

Case 2.1: 

dtoverlay=vc4-kms-v3d enabled -> set via xrandr tool

Case 2.2:

set display_hdmi_rotate=0 in boot/config.txt


## Autohiding the Mouse Pointer


## Disable WiFi Power Save


## Enable file sharing with OS X


## Enable VNC
