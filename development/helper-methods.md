# MagicMirror Helper Methods

The core Magic Mirror object: `MM` has some handy method that will help you in
controlling your and other modules. Most of the `MM` methods are available via
convenience methods on the Module instance.

## Module selection

The only additional method available for your module, is the feature to retrieve
references to other modules. This can be used to hide and show other modules.

### `MM.getModules()`

**Returns Array** - An array with module instances.<br>

To make a selection of all currently loaded module instances, run the
`MM.getModules()` method. It will return an array with all currently loaded
module instances. The returned array has a lot of filtering methods. See below
for more info.

**Note:** This method returns an empty array if not all modules are started yet.
Wait for the `ALL_MODULES_STARTED`
[notification](core-module-file.md#notificationreceived-notification-payload-sender).

#### `.withClass(classnames)`

**_classnames_ String or Array** - The class names on which you want to filter.
**Returns Array** - An array with module instances.<br>

If you want to make a selection based on one or more class names, use the
withClass method on a result of the `MM.getModules()` method. The argument of
the `withClass(classname)` method can be an array, or space separated string.

**Examples:**

```javascript
var modules = MM.getModules().withClass("classname");
var modules = MM.getModules().withClass("classname1 classname2");
var modules = MM.getModules().withClass(["classname1", "classname2"]);
```

#### `.exceptWithClass(classnames)`

**_classnames_ String or Array** - The class names of the modules you want to
remove from the results. **Returns Array** - An array with module instances.<br>

If you to remove some modules from a selection based on a classname, use the
exceptWithClass method on a result of the `MM.getModules()` method. The argument
of the `exceptWithClass(classname)` method can be an array, or space separated
string.

**Examples:**

```javascript
var modules = MM.getModules().exceptWithClass("classname");
var modules = MM.getModules().exceptWithClass("classname1 classname2");
var modules = MM.getModules().exceptWithClass(["classname1", "classname2"]);
```

#### `.exceptModule(module)`

**_module_ Module Object** - The reference to a module you want to remove from
the results. **Returns Array** - An array with module instances.<br>

If you to remove a specific module instance from a selection based on a
classname, use the exceptWithClass method on a result of the `MM.getModules()`
method. This can be helpful if you want to select all module instances except
the instance of your module.

**Examples:**

```javascript
var modules = MM.getModules().exceptModule(this);
```

Of course, you can combine all of the above filters:

**Example:**

```javascript
var modules = MM.getModules()
  .withClass("classname1")
  .exceptwithClass("classname2")
  .exceptModule(aModule);
```

#### `.enumerate(callback)`

**_callback_ Function(module)** - The callback run on every instance.

If you want to perform an action on all selected modules, you can use the
`enumerate` function:

```javascript
MM.getModules().enumerate(function (module) {
  Log.log(module.name);
});
```

**Example:** To hide all modules except your module instance, you could write
something like:

```javascript
Module.register("modulename", {
  //...
  notificationReceived: function (notification, payload, sender) {
    if (notification === "DOM_OBJECTS_CREATED") {
      MM.getModules()
        .exceptModule(this)
        .enumerate(function (module) {
          module.hide(1000, function () {
            //Module hidden.
          });
        });
    }
  },
  //...
});
```
