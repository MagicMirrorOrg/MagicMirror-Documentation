# Logger

The MagicMirror contains a convenience wrapper for logging. Currently, this
logger is a simple proxy to the original `console.log` methods. But it might get
additional features in the future.

**Examples:**

```javascript
Log.info("info");
Log.log("log");
Log.error("error");
```

By default, the logger is only available in the core module file. If you want to
use the logger in the `node_helper.js`, you have to add it by inserting the
following line at the beginning of the file:

```javascript
const Log = require("logger");
```
