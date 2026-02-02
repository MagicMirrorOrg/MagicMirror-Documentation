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

Systemctl is a control interface for systemd, a powerful service manager often
found in full Linux systems. This approach works for both headless (serveronly)
and full Electron UI modes.

The examples below assume:

- MagicMirror is installed in "/home/server/MagicMirror/"
- Node.js is located at "/usr/bin/node" (Run `which node` if you're unsure.)
- Systemd requires absolute paths for all binaries and directories.
- Also, the examples use a user named "server" - replace it with your actual
  username.
- Avoid running as "root" unless absolutely necessary - it increases security
  risks.

### Full Electron UI Mode (Recommended for Desktop Auto-Login)

::: warning Note This section is tailored for **Raspberry Pi OS Desktop**. Users
on other Linux distributions may need to adapt the configuration. :::

For systems with graphical auto-login (e.g. Raspberry Pi OS Desktop), it's best
to use a user systemd service. It starts automatically after the user session is
fully initialized.

#### Create service file

```shell
mkdir -p ~/.config/systemd/user
nano ~/.config/systemd/user/magicmirror.service
```

Note: Why "~/.config/systemd/user/"? User services run in the context of your
desktop session, giving them access to DISPLAY (or WAYLAND_DISPLAY), sound, and
other GUI resources.

#### Paste the following configuration (adjust paths as needed)

```ini
[Unit]
Description=MagicMirror
After=graphical-session.target

[Service]
Type=simple
Restart=always
RestartSec=15
WorkingDirectory=%h/MagicMirror
ExecStart=/usr/bin/node --run start
# Uncomment below lines only for debugging. Persistent logging wears out SD cards.
#StandardOutput=file:%h/MagicMirror/magicmirror.log
#StandardError=file:%h/MagicMirror/magicmirror.log

[Install]
WantedBy=default.target
```

Notes:

- %h is a systemd placeholder for the user’s home directory (e.g.,
  /home/server). It’s safer than hardcoding paths.
- Logging note: By default, this service does not write logs to disk to avoid
  excessive writes on SD cards. If you need logs for debugging, uncomment the
  StandardOutput and StandardError lines in the service file. Remember to
  disable them again after troubleshooting. The file is overwritten on every
  restart (due to `file:` mode).

#### Enable and start the service

Run these commands as your regular user (not with sudo)

```shell
# Reload systemd user config
systemctl --user daemon-reload

# Start MagicMirror now
systemctl --user start magicmirror

# Enable auto-start on boot (after user login)
systemctl --user enable magicmirror

# Restart MagicMirror
systemctl --user restart magicmirror.service

# Stop MagicMirror
systemctl --user stop magicmirror.service

# Disable auto-start
systemctl --user disable magicmirror.service
```

Tip: You can omit `.service` - `systemctl --user start magicmirror` works just
as well.

#### Ensure auto-login is enabled

For this to work on boot, your system must auto-login to the desktop (no
password prompt). On Raspberry Pi OS, configure this via

`sudo raspi-config → System Options → Boot / Auto Login → Desktop Autologin`

### Headless Mode (serveronly)

Use this if you run MagicMirror without a local GUI (e.g., serving to remote
browsers or using a separate display device).

#### Create a system-wide service

```shell
sudo nano /etc/systemd/system/magicmirror.service
```

#### Paste the configuration

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

This runs as a background service - no GUI access. You’ll need a separate
browser (on another device or locally) to view http://localhost:8080.

#### Control the service (requires sudo)

```shell
# Reload systemd config
sudo systemctl daemon-reload

# Start MagicMirror now
sudo systemctl start magicmirror

# Enable auto-start on boot
sudo systemctl enable magicmirror

# Restart MagicMirror
sudo systemctl restart magicmirror.service

# Stop MagicMirror
sudo systemctl stop magicmirror.service

# Disable auto-start
sudo systemctl disable magicmirror.service
```

### Auto-Starting a Browser (for serveronly mode)

If you still want a local display while using serveronly, auto-start Chromium in
kiosk mode

#### Edit the LXDE autostart file

```shell
mkdir -p ~/.config/lxsession/LXDE-pi
nano ~/.config/lxsession/LXDE-pi/autostart
```

#### Add these lines

```shell
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@point-rpi
@sh /home/server/bin/start-chromium.sh
```

#### Create the Chromium launcher script

```shell
mkdir -p ~/bin
nano ~/bin/start-chromium.sh
```

#### Add the following contents

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

#### Make it executable

```shell
chmod +x ~/bin/start-chromium.sh
```

### Troubleshooting

- **Service won’t start? Check logs**

```shell
journalctl --user -u magicmirror -f          # for user service
sudo journalctl -u magicmirror -f            # for system service
```

Also you may look into `~/MagicMirror/magicmirror.log`.

- **Blank screen?** Verify DISPLAY=:0 and XAUTHORITY are set. Add lines below
  into your `~/.config/systemd/user/magicmirror.service`

```shell
Environment=DISPLAY=:0
Environment=XAUTHORITY=%h/.Xauthority
```

- **Permission denied?** Never run Electron as root.
