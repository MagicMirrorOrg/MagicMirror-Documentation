# Update Notification

The `updatenotification` module is one of the default modules of the
MagicMirror. This will display a message whenever a new version of the
MagicMirror application is available.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```javascript
modules: [
  {
    module: 'updatenotification',
    position: 'top_center', // This can be any of the regions.
    config: {
      // The config property is optional.
      // See 'Configuration options' for more information.
    },
  },
]
```

## Configuration options

The following properties can be configured:

| Option                     | Description                                                                                                                                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateInterval`           | How often do you want to check for a new version? This value represents the interval in milliseconds. <br><br> **Possible values:** Any value above `60000` (1 minute) <br> **Default value:** `600000` (10 minutes)                                          |
| `ignoreModules`            | An array of module names that should not check for update. <br><br> **Example:** `["MMM-ExampleModule1", "MMM-ExampleModule2"]`.<br> You can exclude MagicMirror by adding "MagicMirror" to the array. <br> **Default value:** `[]` (empty array, no modules) |
| `sendUpdatesNotifications` | Allow to broadcast update with **UPDATES** notification to other modules.<br><br> **Default value:** `false`                                                                                                                                                  |

## Developer notes

### Broadcast notifications (notifications send to modules)

| Notification | Description                                                                                                                                                                                                                                                                      | Requirement                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| UPDATES      | When updates are available, an Array of updatable modules is sended. <br> This is the best way to update your own module! (a guide will be available soon) <br> Note: It will not include default modules and MagicMirror. <br><br>**Example:** `["MMM-MyOwnModule","MMM-Test"]` | `sendUpdatesNotifications: true` |

### Received notification (notifications send from modules)

| Notification | Description                                         |
| ------------ | --------------------------------------------------- |
| SCAN_UPDATES | Allow force scanning any updates from other modules |
