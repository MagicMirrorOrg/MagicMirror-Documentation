# The Node Helper

The node helper (`node_helper.js`) is a Node.js script that is able to do some
backend task to support your module. For every module type, only one node helper
instance will be created. For example: if your MagicMirror uses two calendar
modules, there will be only one calendar node helper instantiated.

**Note:** Because there is only one node helper per module type, there is no
default config available within your module. It's your task to send the desired
config from your module to your node helper.

In its most simple form, the node_helper.js file must contain:

```js
const NodeHelper = require("node_helper");
module.exports = NodeHelper.create({});
```

Of course, the above helper would not do anything useful. So with the
information above, you should be able to make it a bit more sophisticated.

## Available module instance properties

### `this.name`

**String**

The name of the module

### `this.path`

**String**

The path of the module

### `this.expressApp`

**Express App Instance**

This is a link to the express instance. It will allow you to define extra
routes.

**Example:**

```js
start: function() {
	this.expressApp.get("/foobar", function (req, res) {
		res.send("GET request to /foobar");
	});
}
```

**Note:** By default, a public path to your module's public folder will be
created:

```js
this.expressApp.use("/" + this.name, express.static(this.path + "/public"));
```

### `this.io`

**Socket IO Instance**

This is a link to the IO instance. It will allow you to do some Socket.IO magic.
In most cases you won't need this, since the Node Helper has a few convenience
methods to make this simple.

### `requiresVersion:`

_Introduced in version: 2.1.0._

A string that defines the minimum version of the MagicMirror framework. If it is
set, the system compares the required version with the users version. If the
version of the user is out of date, it won't run the module.

**Note:** Since this check is introduced in version 2.1.0, this check will not
be run in older versions. Keep this in mind if you get issue reports on your
module.

Example:

```js
requiresVersion: "2.1.0",
```

## Subclassable module methods

### `init()`

This method is called when a node helper gets instantiated. In most cases you do
not need to subclass this method.

### `loaded()`

_Introduced in version: 2.1.1._

This method is called after the node helper is loaded and its `name` and `path`
properties have been set, but before `start()` is called. In most cases you do
not need to subclass this method.

### `start()`

This method is called when all node helpers are loaded and the system is ready
to boot up. The start method is a perfect place to define any additional module
properties:

**Example:**

```js
start: function() {
	this.mySpecialProperty = "So much wow!";
	Log.log(this.name + " is started!");
}
```

### `stop()`

This method is called when the MagicMirror server receives a `SIGINT` command
and is shutting down. This method should include any commands needed to close
any open connections, stop any sub-processes and gracefully exit the module.

**Example:**

```js
stop: function() {
	Log.log("Shutting down MyModule");
	this.connection.close();
}
```

### `socketNotificationReceived: function(notification, payload)`

With this method, your node helper can receive notifications from your modules.
When this method is called, it has 2 arguments:

- `notification` - String - The notification identifier.
- `payload` - AnyType - The payload of a notification.

**Note:** The socket connection is established as soon as the module sends its
first message using
[sendSocketNotification](/module-development/core-module-file#this-sendsocketnotification-notification-payload).

**Example:**

```js
socketNotificationReceived: function(notification, payload) {
	Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
},
```

## Module instance methods

Each node helper has some handy methods which can be helpful building your
module.

### `this.sendSocketNotification(notification, payload)`

- `notification` - String - The notification identifier.
- `payload` - AnyType - (Optional) The payload of a notification.

If you want to send a notification to your module, use the
`sendSocketNotification(notification, payload)`. Only the module of your module
type will receive the socket notification.

**Note:** Since all instances of your module will receive the notifications,
it's your task to make sure the right module responds to your messages.

**Example:**

```js
this.sendSocketNotification("SET_CONFIG", this.config);
```

::: warning Reminder

`sendSocketNotification` sends a notification from the helper to all the
instances of your module.

:::

## Using native node modules in your node_helper

If you want use `native node modules` within electron you need to recompile them
for electron. To do so you have to install `electron-rebuild`.

```shell
npm install --save-dev @electron/rebuild
```

and run it after every install (package.json example):

```js
...
"scripts": {
	...
	"postinstall": "./node_modules/.bin/electron-rebuild"
}
...
```
