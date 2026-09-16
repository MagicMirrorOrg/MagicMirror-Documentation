# Raspberry Specific

This information here is based on the latest release of
[Raspberry Pi OS](https://www.raspberrypi.com/software/operating-systems/)
("Trixie") from October 1st 2025.

## Adding colored icons

Raspberry Pi OS does not come with colored emoji icons by default. To add them,
install the following package:

```shell
sudo apt install fonts-noto-color-emoji
```

## Rotating the screen

See the
[official documentation](https://www.raspberrypi.com/documentation/computers/configuration.html#set-resolution-and-rotation)

In case you still run an older version of the Raspberry Pi OS, you can follow
these instructions:

https://pimylifeup.com/raspberry-pi-rotate-screen/

## Troubleshooting WiFi connection problems

If you experience intermittent WiFi connection problems, disabling WiFi power
management can be used as a troubleshooting step. This is not normally required
and should only be changed if you are experiencing connectivity issues.

This applies to systems using NetworkManager, such as current Raspberry Pi OS
releases. Create `/etc/NetworkManager/conf.d/powersave.conf`:

```shell
sudo nano /etc/NetworkManager/conf.d/powersave.conf
```

Add the following lines:

```ini
[connection]
wifi.powersave=2
```

Restart NetworkManager or reboot your Raspberry Pi for the change to take
effect:

```shell
sudo systemctl restart NetworkManager
```

You can check the current setting with:

```shell
iw dev wlan0 get power_save
```

The result should be `off`. Replace `wlan0` with the name of your wireless
interface if necessary.
