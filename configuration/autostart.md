# Autostart your MagicMirror²

The methods below describe ways to automatically start your MagicMirror² on
boot, and even ways to keep it running in case of a failure.

## Using PM2

PM2 is a production process manager for Node.js applications with a built-in
load balancer. It allows you to keep applications alive forever, to reload them
without downtime and to facilitate common system admin tasks. In this case we
will use it to keep a shell script running.

### Install PM2

Install PM2 using NPM:

```shell
sudo npm install -g pm2
```

### Starting PM2 on Boot

To make sure PM2 can do its job when (re)booting your operating system, it needs
to be started on boot. Luckily, PM2 has a handy helper for this.

```shell
pm2 startup
```

PM2 will now show you a command you need to execute.

### Make a MagicMirror² start script

To use PM2 in combination with MagicMirror², we need to make a simple shell
script. Preferable, we put this script outside the MagicMirror² folder to make
sure it won't give us any issues if we want to upgrade the mirror.

```shell
cd ~
nano mm.sh
```

Add the following lines:

```shell
cd ./MagicMirror
DISPLAY=:0 node --run start
```

Save and close, using the commands `CTRL-O` and `CTRL-X`. Now make sure the
shell script is executable by performing the following command:

```shell
chmod +x mm.sh
```

You are now ready to the MagicMirror² using this script using PM2.

### Starting your MagicMirror² with PM2

Simply start your mirror with the following command:

```shell
pm2 start mm.sh
```

You mirror should now boot up and appear on your screen after a few seconds.

### Enable restarting of the MagicMirror² script

To make sure the MagicMirror² restarts after rebooting, you need to save the
current state of all scripts running via PM2. To do this, execute the following
command

```shell
pm2 save
```

And that's all there is! Your MagicMirror² should now reboot after start, and
restart after any failure.

### Controlling your MagicMirror² via PM2

With your MagicMirror running via PM2, you have some handy tools at hand:

#### Restarting your MagicMirror²

```shell
pm2 restart mm
```

#### Stopping your MagicMirror²

```shell
pm2 stop mm
```

#### Show the MagicMirror² logs

```shell
pm2 logs mm
```

#### Show the MagicMirror² process information

```shell
pm2 show mm
```

## Using systemd/systemctl

Note: Systemctl is a control interface for systemd, a powerful service manager
often found in full Linux systems. This approach is most like only applicable
for those using the "server only" setup running on a linux server.

### Create service file

To start, you'll need to create a config file via your editor of choice (nano
used in these examples):

```shell
sudo nano /etc/systemd/system/magicmirror.service
```

Place the below text into your new file, modify as needed (see notes below) then
save & exit. Notes: The example assumes MagicMirror is installed in the
"WorkingDirectory" of "/home/server/MagicMirror/" and your node install is
located at "/usr/bin/node" (run `which node` if you're unsure where to find
node) this means your full manual start command would be "/usr/bin/node
/home/server/MagicMirror/serveronly". While you almost certainly don't type this
all out when you run manually, systemctl requires full paths. This example also
assumes you have an existing Linux user of "server", but any user will do.
"root" will certainly work but has the potential to do more damage, so you
should avoid it if possible.

```ini
[Unit]
Description=MagicMirror
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=server
WorkingDirectory=/home/server/MagicMirror/
ExecStart=/usr/bin/node serveronly

[Install]
WantedBy=multi-user.target
```

### Control MM with systemctl

Now try starting MM with the commands below. If start is successful work, use
the 'enable' command below to automatically start when MM fails or is rebooted.
If MM does not start, use the "status" command below to see most recent errors.

Note: For any of the below commands 'magicmirror.service' can be replaced with
`magicmirror` as systemd will automatically look for `\*.service`

#### Start MM with systemctl

```shell
sudo systemctl start magicmirror.service
```

#### Stop MM with systemctl

```shell
sudo systemctl stop magicmirror.service
```

#### To check the status of MagicMirror²

```shell
sudo systemctl status magicmirror.service
```

#### Allow autostart MagicMirror² on boot

Note: does not start immediately, need to run start command or reboot

```shell
sudo systemctl enable magicmirror.service
```

#### Disable autostart of MagicMirror²

```shell
sudo systemctl disable magicmirror.service
```

### Autostart browser for server mode

Create file `/home/server/.config/lxsession/LXDE-pi/autostart` with the
following contents:

```shell
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@point-rpi
@sh /home/server/bin/start-chromium.sh
```

Create file `/home/server/bin/start-chromium.sh` with the following contents:

```shell
#!/bin/sh

set -e

CHROMIUM_TEMP=~/tmp/chromium
rm -Rf ~/.config/chromium/
rm -Rf $CHROMIUM_TEMP
mkdir -p $CHROMIUM_TEMP

chromium-browser \
        --disable \
        --disable-translate \
        --disable-infobars \
        --disable-suggestions-service \
        --disable-save-password-bubble \
        --disk-cache-dir=$CHROMIUM_TEMP/cache/ \
        --user-data-dir=$CHROMIUM_TEMP/user_data/ \
        --start-maximized \
        --kiosk http://localhost:8080 &
```
