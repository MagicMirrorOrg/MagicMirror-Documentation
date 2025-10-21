---
title: Debugging
---

# Core Development Documentation: Debugging

Tips and tricks for debugging MagicMirror²,

## Make sure dependencies are up-to-date

When you pull a branch, exceptions can be thrown when running MagicMirror²:

```
App threw an error during load
Error: Cannot find module 'ansis'
Require stack:
```

If this happens, make sure that dependencies have been updated to latest by
executing `npm install`.

## Breakpoints

Node.js has support for
[built-in breakpoints](https://nodejs.org/api/debugger.html), or
[VSCode](https://code.visualstudio.com/) allows for visual breakpoints and
inspecting of objects.

Developer consoles in browsers and the Electron app (typically CTRL+SHIFT+I to
toggle open/close) can be used to set client-side breakpoints, step through
scripts and inspect variables.

## Logging

While there are no log files produced by the server, info is reported in two
different places:

- The console when running from `npm run start` or `npm run server`.
  - This is separated into two streams, `console.log()` is output as the
    `stdout` stream, and
  - `console.error()` is output as the `stderr` stream.
  - These can be redirected to files when starting the server. `>` will redirect
    `stdout`, and `2>` will redirect `stderr`. `2>&1` will combine both streams:
    `npm run start > out.log 2>&1`
- The browser's developer console (typically CTRL+SHIFT+I to toggle open/close)
  will have output from scripts that run on the browser.

The [MMM-Logging](https://github.com/shbatm/MMM-Logging) module can help to
gather logs and output to a file, but at a performance cost.

Debug logging is disabled by default, and can be very verbose. It can be enabled
in the _config/config.js_ file by adding `"DEBUG"` to the `logLevel` key:

```js
let config = {
  // ...
  logLevel: ["INFO", "LOG", "WARN", "ERROR", "DEBUG"], // Add "DEBUG" for even more logging
  // ...
};
```

If you are using `pm2` to launch MagicMirror², you can use the `logs` command to
display lines from each of the `stderr` and `stdout` streams, but not interlaced
by time:

```sh
pm2 logs --lines=15 # will show 15 lines each from stdout and stderr
```

There is no capability to identify the module that is producing console output.
However, most browsers have the ability to filter logs by a string.

## Date

It can be very useful to set the current date to debug calendar issues. In order
to do this, override `Date.now` with a lambda in _config/config.js_:

```js
Date.now = () => new Date("2023-12-31T14:05:32").valueOf();
```

This will cause every request for the current time to return the specified time,
at least for the core and built-in modules.

Several tests use this to override the current time for the test. See
`startApplication()` in _tests/electron/helpers/global-setup.js_ as it has a
`systemDate` argument to override the system date for tests.

**NOTE:** Some modules may use `new Date()` to get the current date/time, though
this is not recommended. If this is the case, the external module will not work
correctly for date debugging.

## Timezone

The `TZ` environment variable can be used to specify a valid
[canonical timezone name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
from the [tz database](https://en.wikipedia.org/wiki/Tz_database).

Several tests do this, such as this example in
_tests/electron/helpers/global-setup.js_:

```js
process.env.TZ = "GMT";
```

The _package.json_ could also be modified to force a timezone for a given
script, such as `start:dev`:

```json
"start:dev": "TZ=Europe/Madrid ./node_modules/.bin/electron js/electron.js dev"
```

Or when running from the command line (Linux example):

```sh
TZ=Europe/Madrid npm run start:dev
```
