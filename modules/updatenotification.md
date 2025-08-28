# Update Notification

The `updatenotification` module is one of the default modules of the
MagicMirror. This will display a message whenever a new version of the
MagicMirror application is available.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```js
    {
      module: "updatenotification",
      position: "top_center", // This can be any of the regions.
      config: {
        // The config property is optional.
        // See 'Configuration options' for more information.
      },
    },
```

## Configuration options

The following properties can be configured:

| Option                     | Description                                                                                                                                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateInterval`           | How often do you want to check for a new version? This value represents the interval in milliseconds. <br><br> **Possible values:** Any value above `60000` (1 minute) <br> **Default value:** `600000` (10 minutes)                                          |
| `ignoreModules`            | An array of module names that should not check for update. <br><br> **Example:** `["MMM-ExampleModule1", "MMM-ExampleModule2"]`.<br> You can exclude MagicMirror by adding "MagicMirror" to the array. <br> **Default value:** `[]` (empty array, no modules) |
| `sendUpdatesNotifications` | Allow to broadcast update with **UPDATES** notification to other modules.<br><br> **Default value:** `false`                                                                                                                                                  |
| `updates`                  | Array of updates modules commands. <br> **Default value:** `[]` (see bellow)                                                                                                                                                                                  |
| `updateTimeout`            | Maximum Update duration before cancel it. <br> **Default Value:** `120000` (2 minutes)                                                                                                                                                                        |
| `updateAutorestart`        | Restart automatically MagicMirror² after update is done. <br> **Default Value:** `false`                                                                                                                                                                      |
| `useModulesFromConfig`     | If `false` iterate over modules directory instead using modules defined in `config.js`. <br> **Default Value:** `true`                                                                                                                                        |

### `updates` Array

`updates` is an array of command for updating 3rd party modules modules

It consists of an object containing the name of the module and the associated
update command

Sample:

```js
    {
      module: "updatenotification",
      position: "top_center", // This can be any of the regions.
      config: {
        updates: [
          // array of module update commands
          {
            // update of MMM-Test with embed npm script
            "MMM-Test": "node --run update",
          },
          {
            // update of MMM-OtherSample with "complex" process command
            "MMM-OtherSample":
              "rm -rf package-lock.json && git reset --hard && git pull && npm install",
          },
          {
            // update of MMM-OtherSample2 with git pull && npm install command
            "MMM-OtherSample2": "git pull && npm install",
          },
          {
            // update of MMM-OtherSample3 with a simple git pull
            "MMM-OtherSample3": "git pull",
          },
        ],
      },
    },
```

Note: Don’t hesitate to ask the module developer for the ideal command to update
their module.

## Developer notes

### Broadcast notifications (notifications send to modules)

| Notification | Description                                                                                                                                                                                                                                                                      | Requirement                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| UPDATES      | When updates are available, an Array of updatable modules is sended. <br> This is the best way to update your own module! (a guide will be available soon) <br> Note: It will not include default modules and MagicMirror. <br><br>**Example:** `["MMM-MyOwnModule","MMM-Test"]` | `sendUpdatesNotifications: true` |

### Received notification (notifications send from modules)

| Notification | Description                                         |
| ------------ | --------------------------------------------------- |
| SCAN_UPDATES | Allow force scanning any updates from other modules |
