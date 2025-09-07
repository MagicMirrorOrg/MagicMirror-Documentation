---
title: Debugging
---

# Core Development Documentation: Debugging

Tips and tricks for debugging MagicMirror²,

## Breakpoints

Node.js has support for [built-in breakpoints](https://nodejs.org/api/debugger.html), or [VSCode](https://code.visualstudio.com/) allows for
visual breakpoints and inspecting of objects.

## Date

It can be very useful to set the current date to debug calendar issues. In order to do this, override `Date.now` with a lambda in *config/config.js*:

```js
Date.now = () => new Date('2023-12-31T14:05:32');
```

This will cause every request for the current time to return the specified time, at least for the core and built-in modules.

**NOTE:** Some modules may use `new Date()` to get the current date/time, though this is not recommended. If this is the case,
the external module will not work correctly for date debugging.

## Timezone

The `TZ` environment variable can be used to specify a valid [canonical timezone name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
from the [tz database](https://en.wikipedia.org/wiki/Tz_database).

Several tests do this, such as this example in *tests/electron/helpers/global-setup.js*:

```js
process.env.TZ = "GMT";
```

The *package.json* could also be modified to force a timezone for a given script, such as `start:dev`:

```json
"start:dev": "TZ=Europe/Madrid ./node_modules/.bin/electron js/electron.js dev"
```

Or when running from the command line (Linux example):
```sh
TZ=Europe/Madrid npm run start:dev
```
