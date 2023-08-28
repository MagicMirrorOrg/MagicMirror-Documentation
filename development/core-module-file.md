# The Core module file

This is the script in which the module will be defined. This script is required
in order for the module to be used. In it's most simple form, the core module
file must be named after the module (`modulename.js`) and must contain:

```javascript
Module.register("modulename", {});
```

Of course, the above module would not do anything fancy, so it's good to look at
one of the simplest modules: **helloworld**:

```javascript
//helloworld.js:

Module.register("helloworld", {
  // Default module config.
  defaults: {
    text: "Hello World!",
  },

  // Override dom generator.
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.config.text;
    return wrapper;
  },
});
```

As you can see, the `Module.register()` method takes two arguments: the name of
the module and an object with the module properties.

## Available module instance properties

After the module is initialized, the module instance has a few available module
properties:

| Instance Property | Type    | Description                                                                                                                                                                                      |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `this.name`       | String  | The name of the module.                                                                                                                                                                          |
| `this.identifier` | String  | This is a unique identifier for the module instance.                                                                                                                                             |
| `this.hidden`     | Boolean | This represents if the module is currently hidden (faded away).                                                                                                                                  |
| `this.config`     | Boolean | The configuration of the module instance as set in the user's `config.js` file. This config will also contain the module's defaults if these properties are not over-written by the user config. |
| `this.data`       | Object  | The data object contain additional metadata about the module instance. (See below)                                                                                                               |

The `this.data` data object contain the following metadata:

- `data.classes` - The classes which are added to the module dom wrapper.
- `data.file` - The filename of the core module file.
- `data.path` - The path of the module folder.
- `data.header` - The header added to the module.
- `data.position` - The position in which the instance will be shown.

### `defaults: {}`

Any properties defined in the defaults object, will be merged with the module
config as defined in the user's config.js file. This is the best place to set
your modules' configuration defaults. Any of the module configuration properties
can be accessed using `this.config.propertyName`, but more about that later.

### `requiresVersion:`

_Introduced in version: 2.1.0._

A string that defines the minimum version of the MagicMirror framework. If it is
set, the system compares the required version with the users version. If the
version of the user is out of date, it won't run the module. Make sure to also
set this value in the Node helper.

**Note:** Since this check is introduced in version 2.1.0, this check will not
be run in older versions. Keep this in mind if you get issue reports on your
module.

Example:

```javascript
requiresVersion: "2.1.0",
```

## Subclassable module methods

### `init()`

This method is called when a module gets instantiated. In most cases you do not
need to subclass this method.

### `loaded(callback)`

_Introduced in version: 2.1.1._

This method is called when a module is loaded. Subsequent modules in the config
are not yet loaded. The `callback` function MUST be called when the module is
done loading. In most cases you do not need to subclass this method.

**Example:**

```javascript
loaded: function(callback) {
	this.finishLoading();
	Log.log(this.name + ' is loaded!');
	callback();
}
```

### `start()`

This method is called when all modules are loaded and the system is ready to
boot up. Keep in mind that the dom object for the module is not yet created. The
start method is a perfect place to define any additional module properties:

**Example:**

```javascript
start: function() {
	this.mySpecialProperty = "So much wow!";
	Log.log(this.name + ' is started!');
}
```

### `getScripts()`

**Should return: Array**

The getScripts method is called to request any additional scripts that need to
be loaded. This method should therefore return an array with strings. If you
want to return a full path to a file in the module folder, use the
`this.file('filename.js')` method. In all cases the loader will only load a file
once. It even checks if the file is available in the default vendor folder.

**Example:**

```javascript
getScripts: function() {
	return [
		'script.js', // will try to load it from the vendor folder, otherwise it will load is from the module folder.
		'moment.js', // this file is available in the vendor folder, so it doesn't need to be available in the module folder.
		this.file('anotherfile.js'), // this file will be loaded straight from the module folder.
		'https://code.jquery.com/jquery-2.2.3.min.js',  // this file will be loaded from the jquery servers.
	]
}

```

**Note:** If a file can not be loaded, the boot up of the mirror will stall.
Therefore, it's advised not to use any external urls.

### `getStyles()`

**Should return: Array**

The getStyles method is called to request any additional stylesheets that need
to be loaded. This method should therefore return an array with strings. If you
want to return a full path to a file in the module folder, use the
`this.file('filename.css')` method. In all cases the loader will only load a
file once. It even checks if the file is available in the default vendor folder.

**Example:**

```javascript
getStyles: function() {
	return [
		'script.css', // will try to load it from the vendor folder, otherwise it will load is from the module folder.
		'font-awesome.css', // this file is available in the vendor folder, so it doesn't need to be available in the module folder.
		this.file('anotherfile.css'), // this file will be loaded straight from the module folder.
		'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',  // this file will be loaded from the bootstrapcdn servers.
	]
}

```

**Note:** If a file can not be loaded, the boot up of the mirror will stall.
Therefore, it's advised not to use any external URLs.

### `getTranslations()`

**Should return: Dictionary**

The getTranslations method is called to request translation files that need to
be loaded. This method should therefore return a dictionary with the files to
load, identified by the country's short name.

If the module does not have any module specific translations, the function can
just be omitted or return `false`.

**Example:**

```javascript
getTranslations: function() {
	return {
			en: "translations/en.json",
			de: "translations/de.json"
	}
}

```

### `getDom()`

**Should return:** Dom Object

Whenever the MagicMirror needs to update the information on screen (because it
starts, or because your module asked a refresh using `this.updateDom()`), the
system calls the getDom method. This method should therefore return a dom
object.

**Example:**

```javascript
getDom: function() {
	var wrapper = document.createElement("div");
	wrapper.innerHTML = 'Hello world!';
	return wrapper;
}

```

### `getHeader()`

**Should return:** String

Whenever the MagicMirror needs to update the information on screen (because it
starts, or because your module asked a refresh using `this.updateDom()`), the
system calls the getHeader method to retrieve the module's header. This method
should therefor return a string. If this method is not subclassed, this function
will return the user's configured header.

If you want to use the original user's configured header, reference
`this.data.header`.

**NOTE:** If the user did not configure a default header, no header will be
displayed and thus this method will not be called.

**Example:**

```javascript
getHeader: function() {
	return this.data.header + ' Foo Bar';
}

```

### `notificationReceived(notification, payload, sender)`

That MagicMirror core has the ability to send notifications to modules. Or even
better: the modules have the possibility to send notifications to other modules.
When this module is called, it has 3 arguments:

- `notification` - String - The notification identifier.
- `payload` - AnyType - The payload of a notification.
- `sender` - Module - The sender of the notification. If this argument is
  `undefined`, the sender of the notification is the core system.

**Example:**

```javascript
notificationReceived: function(notification, payload, sender) {
	if (sender) {
		Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
	} else {
		Log.log(this.name + " received a system notification: " + notification);
	}
}
```

**Note:** the system sends three notifications when starting up. These
notifications could come in handy!

- `ALL_MODULES_STARTED` - All modules are started. You can now send
  notifications to other modules.
- `DOM_OBJECTS_CREATED` - All dom objects are created. The system is now ready
  to perform visual changes.
- `MODULE_DOM_CREATED` - This module's dom has been fully loaded. You can now
  access your module's dom objects.

### `socketNotificationReceived: function(notification, payload)`

When using a node_helper, the node helper can send your module notifications.
When this module is called, it has 2 arguments:

- `notification` - String - The notification identifier.
- `payload` - AnyType - The payload of a notification.

**Note 1:** When a node helper sends a notification, all modules of that module
type receive the same notifications. <br> **Note 2:** The socket connection is
established as soon as the module sends its first message using
[sendSocketNotification](#this-sendsocketnotification-notification-payload).

**Example:**

```javascript
socketNotificationReceived: function(notification, payload) {
	Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
},
```

### `suspend()`

When a module is hidden (using the `module.hide()` method), the `suspend()`
method will be called. By subclassing this method you can perform tasks like
halting the update timers.

### `resume()`

When a module is requested to be shown (using the `module.show()` method), the
`resume()` method will be called. By subclassing this method you can perform
tasks restarting the update timers.

## Module instance methods

Each module instance has some handy methods which can be helpful building your
module.

### `this.file(filename)`

**_filename_ String** - The name of the file you want to create the path
for.<br> **Returns String**

If you want to create a path to a file in your module folder, use the `file()`
method. It returns the path to the filename given as the attribute. Is method
comes in handy when configuring the [getScripts](#getscripts) and
[getStyles](#getstyles) methods.

### `this.updateDom(speed)`

**_speed_ Number** - Optional. Animation speed in milliseconds.<br>

Whenever your module need to be updated, call the `updateDom(speed)` method. It
requests the MagicMirror core to update its dom object. If you define the speed,
the content update will be animated, but only if the content will really change.

As an example: the clock modules calls this method every second:

```javascript
...
start: function() {
	var self = this;
	setInterval(function() {
		self.updateDom(); // no speed defined, so it updates instantly.
	}, 1000); //perform every 1000 milliseconds.
},
...
```

### `this.sendNotification(notification, payload)`

**_notification_ String** - The notification identifier.<br> **_payload_
AnyType** - Optional. A notification payload.<br>

If you want to send a notification to all other modules, use the
`sendNotification(notification, payload)`. All other modules will receive the
message via the
[notificationReceived](#notificationreceived-notification-payload-sender)
method. In that case, the sender is automatically set to the instance calling
the sendNotification method.

**Example:**

```javascript
this.sendNotification("MYMODULE_READY_FOR_ACTION", { foo: bar });
```

### `this.sendSocketNotification(notification, payload)`

**_notification_ String** - The notification identifier.<br> **_payload_
AnyType** - Optional. A notification payload.<br>

If you want to send a notification to the node_helper, use the
`sendSocketNotification(notification, payload)`. Only the node_helper of this
module will receive the socket notification.

**Example:**

```javascript
this.sendSocketNotification("SET_CONFIG", this.config);
```

### `this.hide(speed, callback, options)`

**_speed_ Number** - Optional (Required when setting callback or options), The
speed of the hide animation in milliseconds. **_callback_ Function** - Optional,
The callback after the hide animation is finished. **_options_ Function** -
Optional, Object with additional options for the hide action (see below).
(_Introduced in version: 2.1.0._)

To hide a module, you can call the `hide(speed, callback)` method. You can call
the hide method on the module instance itself using `this.hide()`, but of course
you can also hide another module using `anOtherModule.hide()`.

Possible configurable options:

- `lockString` - String - When setting lock string, the module can not be shown
  without passing the correct lockstring. This way (multiple) modules can
  prevent a module from showing. It's considered best practice to use your
  modules identifier as the locksString: `this.identifier`. See _visibility
  locking_ below.

**Note 1:** If the hide animation is cancelled, for instance because the show
method is called before the hide animation was finished, the callback will not
be called.<br> **Note 2:** If the hide animation is hijacked (an other method
calls hide on the same module), the callback will not be called.<br> **Note 3:**
If the dom is not yet created, the hide method won't work. Wait for the
`DOM_OBJECTS_CREATED`
[notification](#notificationreceived-notification-payload-sender).

### `this.show(speed, callback, options)`

**_speed_ Number** - Optional (Required when setting callback or options), The
speed of the show animation in milliseconds. **_callback_ Function** - Optional,
The callback after the show animation is finished. **_options_ Function** -
Optional, Object with additional options for the show action (see below).
(_Introduced in version: 2.1.0._)

To show a module, you can call the `show(speed, callback)` method. You can call
the show method on the module instance itself using `this.show()`, but of course
you can also show another module using `anOtherModule.show()`.

Possible configurable options:

- `lockString` - String - When setting lock string, the module can not be shown
  without passing the correct lockstring. This way (multiple) modules can
  prevent a module from showing. See _visibility locking_ below.
- `force` - Boolean - When setting the force tag to `true`, the locking
  mechanism will be overwritten. Use this option with caution. It's considered
  best practice to let the usage of the force option be use- configurable. See
  _visibility locking_ below.
- `onError(error)` - Function - If a module is hidden with other lock strings
  and can therefore not be shown the onError callback triggers with an error
  object, if specified in the options (_Introduced in version: 2.15.0_).

**Note 1:** If the show animation is canceled, for instance because the hide
method is called before the show animation was finished, the callback will not
be called.<br> **Note 2:** If the show animation is hijacked (an other method
calls show on the same module), the callback will not be called.<br> **Note 3:**
If the dom is not yet created, the show method won't work. Wait for the
`DOM_OBJECTS_CREATED`
[notification](#notificationreceived-notification-payload-sender).

### Visibility locking

(_Introduced in version: 2.1.0._)

Visibility locking helps the module system to prevent unwanted hide/show
actions. The following scenario explains the concept:

**Module B asks module A to hide:**

```javascript
moduleA.hide(0, { lockString: "module_b_identifier" });
```

Module A is now hidden, and has an lock array with the following strings:

```javascript
moduleA.lockStrings == ["module_b_identifier"];
moduleA.hidden == true;
```

**Module C asks module A to hide:**

```javascript
moduleA.hide(0, { lockString: "module_c_identifier" });
```

Module A is now hidden, and has an lock array with the following strings:

```javascript
moduleA.lockStrings == ["module_b_identifier", "module_c_identifier"];
moduleA.hidden == true;
```

**Module B asks module A to show:**

```javascript
moduleA.show(0, { lockString: "module_b_identifier" });
```

The lockString will be removed from moduleA’s locks array, but since there still
is an other lock string available, the module remains hidden:

```javascript
moduleA.lockStrings == ["module_c_identifier"];
moduleA.hidden == true;
```

**Module C asks module A to show:**

```javascript
moduleA.show(0, { lockString: "module_c_identifier" });
```

The lockString will be removed from moduleA’s locks array, and since this will
result in an empty lock array, the module will be visible:

```javascript
moduleA.lockStrings == [];
moduleA.hidden == false;
```

**Note:** The locking mechanism can be overwritten by using the force tag:

```javascript
moduleA.show(0, { force: true });
```

This will reset the lockstring array, and will show the module.

```javascript
moduleA.lockStrings == [];
moduleA.hidden == false;
```

Use this `force` method with caution. See `show()` method for more information.

### `this.translate(identifier)`

**_identifier_ String** - Identifier of the string that should be translated.

The Magic Mirror contains a convenience wrapper for `l18n`. You can use this to
automatically serve different translations for your modules based on the user's
`language` configuration.

If no translation is found, a fallback will be used. The fallback sequence is as
follows:

- 1. Translation as defined in module translation file of the user's preferred
     language.
- 2. Translation as defined in core translation file of the user's preferred
     language.
- 3. Translation as defined in module translation file of the fallback language
     (the first defined module translation file).
- 4. Translation as defined in core translation file of the fallback language
     (the first defined core translation file).
- 5. The key (identifier) of the translation.

When adding translations to your module, it's a good idea to see if an
appropriate translation is already available in the
[core translation files](https://github.com/MichMich/MagicMirror/tree/master/translations).
This way, your module can benefit from the existing translations.

**Example:**

```javascript
this.translate("INFO"); //Will return a translated string for the identifier INFO
```

**Example json file:**

```javascript
{
  "INFO": "Really important information!"
}
```

**Note:** although comments are officially not supported in JSON files,
MagicMirror allows it by stripping the comments before parsing the JSON file.
Comments in translation files could help other translators.

#### `this.translate(identifier, variables)`

**_identifier_ String** - Identifier of the string that should be translated.
**_variables_ Object** - Object of variables to be used in translation.

This improved and backwards compatible way to handle translations behaves like
the normal translation function and follows the rules described above. It's
recommended to use this new format for translating everywhere. It allows
translator to change the word order in the sentence to be translated.

**Example:**

```javascript
var timeUntilEnd = moment(event.endDate, "x").fromNow(true);
this.translate("RUNNING", { "timeUntilEnd": timeUntilEnd) }); // Will return a translated string for the identifier RUNNING, replacing `{timeUntilEnd}` with the contents of the variable `timeUntilEnd` in the order that translator intended.
```

**Example English .json file:**

```javascript
{
	"RUNNING": "Ends in {timeUntilEnd}",
}
```

**Example Finnish .json file:**

```javascript
{
	"RUNNING": "Päättyy {timeUntilEnd} päästä",
}
```

**Note:** The _variables_ Object has an special case called `fallback`. It's
used to support old translations in translation files that do not have the
variables in them. If you are upgrading an old module that had translations that
did not support the word order, it is recommended to have the fallback layout.

**Example:**

```javascript
var timeUntilEnd = moment(event.endDate, "x").fromNow(true);
this.translate("RUNNING", {
	"fallback": this.translate("RUNNING") + " {timeUntilEnd}"
	"timeUntilEnd": timeUntilEnd
)}); // Will return a translated string for the identifier RUNNING, replacing `{timeUntilEnd}` with the contents of the variable `timeUntilEnd` in the order that translator intended. (has a fallback)
```

**Example Swedish .json file that does not have the variable in it:**

```javascript
{
	"RUNNING": "Slutar",
}
```

In this case the `translate`-function will not find any variables in the
translation, will look for `fallback` variable and use that if possible to
create the translation.
