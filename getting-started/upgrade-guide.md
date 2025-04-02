# Upgrade Guide

::: danger WARNING

Always backup your `config.js`, `custom.css` and `modules` folder before you
start the upgrade process!

:::

If you want to update your MagicMirror² to the latest version, use your terminal
to go to your MagicMirror folder and type the following command:

```shell
git pull && npm run install-mm
```

If you changed nothing more than the config or the modules, this should work
without any problems.

::: danger WARNING

Using `git reset --hard` as described below will delete all your changes made in
the source code, so only execute this if you know what you are doing!

:::

Type `git status` to see your changes, if there are any, you can reset them with
`git reset --hard`. After that, `git pull` should be possible.

Your upgrade may fail if you do not have the version of `node` required by the 
latest release of MagicMirror².  If you need to upgrade `node`, you can run the 
following command:

`sudo n stable`

If you want to try the community maintained automated update then, please see
[alternative installation methods](installation.md#alternative-installation-methods)
