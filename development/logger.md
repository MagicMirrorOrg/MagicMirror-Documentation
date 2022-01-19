# Logger

The Magic Mirror contains a convenience wrapper for logging. Currently, this logger is a simple proxy to the original `console.log` methods. But it might get additional features in the future. The Loggers is currently only available in the core module file (not in the node_helper).

**Examples:**
```javascript
Log.info('error');
Log.log('log');
Log.error('info');
```
