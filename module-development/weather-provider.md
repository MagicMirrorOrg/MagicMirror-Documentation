# Weather Module Weather Provider Development

This document describes the way to develop your own MagicMirror² weather
provider for the weather module.

::: warning BREAKING CHANGE in v2.35.0

Weather providers now run **server-side** as Node.js classes. The old
client-side `WeatherProvider.register("name", { ... })` API was removed. Custom
providers from earlier versions must be updated for the new structure.

:::

## The weather provider file: `yourprovider.js`

This is the script in which the weather provider will be defined. The file must
be placed in MagicMirror's built-in weather provider directory:

```bash
~/MagicMirror/defaultmodules/weather/providers/yourprovider.js
```

The filename (lowercased) must match the `weatherProvider` value in `config.js`.

```js
{
  module: "weather",
  config: {
    weatherProvider: "yourprovider",
    type: "current" // or "forecast" / "hourly"
  }
}
```

This directory is part of the MagicMirror git repository. A custom file placed
here may conflict with future updates, so keep a copy outside the repository
before running `git pull`. You can also tell git not to track local changes to
that file:

```bash
git -C ~/MagicMirror update-index --assume-unchanged \
  defaultmodules/weather/providers/yourprovider.js
```

In its most simple form, the weather provider must implement the following:

```js
const HTTPFetcher = require("#http_fetcher");

class YourProvider {
  constructor(config) {
    this.config = config;
    this.locationName = null;
    this.fetcher = null;
    this.onDataCallback = null;
    this.onErrorCallback = null;
  }

  setCallbacks(onData, onError) {
    this.onDataCallback = onData;
    this.onErrorCallback = onError;
  }

  initialize() {
    this.fetcher = new HTTPFetcher("https://your.api/endpoint", {
      reloadInterval: this.config.updateInterval,
      logContext: "weatherprovider.yourprovider",
    });

    this.fetcher.on("response", async (response) => {
      const data = await response.json();
      this.onDataCallback(this.parseWeather(data));
    });

    this.fetcher.on("error", (errorInfo) => this.onErrorCallback(errorInfo));
  }

  start() {
    this.fetcher?.startPeriodicFetch();
  }

  stop() {
    this.fetcher?.clearTimer();
  }

  parseWeather(data) {
    return { temperature: data.temp };
  }
}

module.exports = YourProvider;
```

## Weather provider methods to implement

::: warning IMPORTANT

The weather module expects the weather data to be in metric units:

- `degree celsius` for temperatures
- `meters per second` for wind

Some weather APIs already deliver their data in those units.

If that is not the case, convert the values before sending them to the weather
module.

:::

### `constructor(config)`

This method receives the full weather module config. Store it as `this.config`
and initialize the provider state here. The optional `locationName` property is
shown in the module header.

### `setCallbacks(onData, onError)`

This method is called by the `node_helper` before `initialize()`. Store both
callbacks and call `onData(weatherData)` whenever new weather data is available.
Call `onError({ message, translationKey })` when something goes wrong.

### `initialize()`

This method is called once when the provider is loaded. It may be `async`.

Validate required options such as API keys, coordinates, or provider-specific
location IDs here. If required configuration is missing, call `onErrorCallback`
with a useful message and return early — without creating the fetcher.

If validation passes, delegate the fetcher setup to a private helper (e.g.
`#initializeFetcher()`). Keeping these two concerns separate makes the code
easier to follow. You can also resolve `this.locationName` here if your provider
needs an extra lookup before starting to fetch.

If `initialize()` throws, provider startup fails and the module reports an
error. For API errors, call `onErrorCallback` with a useful message instead of
throwing from setup code.

### `start()`

This method is called when the weather provider is about to start. Usually this
starts periodic fetching:

```js
start() {
  this.fetcher?.startPeriodicFetch();
}
```

### `stop()`

This method is called when the weather provider is stopped. Cancel timers or
other open resources here:

```js
stop() {
  this.fetcher?.clearTimer();
}
```

### Parsing weather data

Process the API response in your `HTTPFetcher` response handler and pass the
result to `onDataCallback`. Return a plain JavaScript object for
`type: "current"`, or an array of objects for `type: "forecast"` and
`type: "hourly"`.

Wrap `response.json()` and your parsing logic in `try`/`catch` so invalid JSON
or unexpected API response shapes can be reported through `onErrorCallback`
instead of failing silently.

`HTTPFetcher` (`require("#http_fetcher")`) handles periodic fetching with retry
and backoff. See
[`js/http_fetcher.js`](https://github.com/MagicMirrorOrg/MagicMirror/blob/master/js/http_fetcher.js)
for all options. Common `translationKey` values: `MODULE_ERROR_UNAUTHORIZED`,
`MODULE_ERROR_RATE_LIMITED`, `MODULE_ERROR_SERVER_ERROR`,
`MODULE_ERROR_NO_CONNECTION`, `MODULE_ERROR_UNSPECIFIED`.

## Weather Provider instance methods

The `node_helper` controls the provider lifecycle in this order:

1. `setCallbacks(onData, onError)`
2. `initialize()`
3. `start()`
4. `stop()` when the module is stopped

These replace the old client-side provider methods such as
`fetchCurrentWeather()`, `fetchWeatherForecast()`, `setCurrentWeather()`, and
`updateAvailable()`.

## WeatherObject

This object holds all data from your provider for usage in the template. A
server-side provider returns plain objects; the weather module converts them to
`WeatherObject` instances on the client.

| Property                 | Type     | Value/Unit                                                                                                      |
| ------------------------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| date                     | `Date`   | JavaScript `Date` object of the time/date.                                                                      |
| windSpeed                | `number` | Speed of the wind in metric: `meter/second`                                                                     |
| windFromDirection        | `number` | Direction of the wind in degrees.                                                                               |
| sunrise                  | `Date`   | JavaScript `Date` object of sunrise.                                                                            |
| sunset                   | `Date`   | JavaScript `Date` object of sunset.                                                                             |
| temperature              | `number` | Current temperature in metric `celsius degree`.                                                                 |
| minTemperature           | `number` | Lowest temperature of the day in metric `celsius degree`.                                                       |
| maxTemperature           | `number` | Highest temperature of the day in metric `celsius degree`.                                                      |
| weatherType              | `string` | Icon name of the weather type. <br> Possible values: [WeatherIcons](https://www.npmjs.com/package/weathericons) |
| humidity                 | `number` | Percentage of humidity                                                                                          |
| precipitationAmount      | `number` | Metric: `millimeters`                                                                                           |
| precipitationUnits       | `string` | Optional precipitation unit override                                                                            |
| precipitationProbability | `number` | Precipitation probability as percentage                                                                         |

### Current weather

For the current weather object the following properties are required:

- humidity
- sunrise
- sunset
- temperature
- weatherType
- windFromDirection
- windSpeed

### Weather forecast

For the forecast weather object the following properties are required:

- date
- maxTemperature
- minTemperature
- precipitationAmount
- weatherType

If your API does not provide one of these values, use a sensible fallback where
possible. The important part is that the weather module receives the fields it
expects for the selected `type`.

For real examples, look at the built-in providers in
[`defaultmodules/weather/providers/`](https://github.com/MagicMirrorOrg/MagicMirror/tree/master/defaultmodules/weather/providers).
