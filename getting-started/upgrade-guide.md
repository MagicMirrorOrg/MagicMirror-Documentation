# Upgrade Guide

::: danger WARNING

Always backup your `config.js`, `custom.css` and `modules` folder before you
start the upgrade process!

:::

## Manual Upgrade

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

`sudo n stable`

## Alternative Upgrade Methods

### Community-Maintained Automatic Upgrade Script

Sam (@sdetweil, long time contributor of the MagicMirror² framework) maintains an 
easy-to-use update script: [https://github.com/sdetweil/MagicMirror_scripts](https://github.com/sdetweil/MagicMirror_scripts/?tab=readme-ov-file#upgrade-to-next-magicmirror-version-from-an-existing-installation)
