# Weather Module Weather Provider Development

This document describes the way to develop your own MagicMirror² weather
provider for the weather module.

## The weather provider file: yourprovider.js

This is the script in which the weather provider will be defined. In its most
simple form, the weather provider must implement the following:

```js
WeatherProvider.register("yourprovider", {
  providerName: "YourProvider",

  fetchCurrentWeather() {},

  fetchWeatherForecast() {},
});
```

## Weather provider methods to implement

::: warning IMPORTANT

The weather module expects the weather data to be in metric units:

- `degree celsius` for temperatures
- `meters per second` for wind

Some weather APIs already deliver their data in those units.

If that is not the case you can use helper methods from the `weatherutils.js`
class to convert the data.

:::

### `fetchCurrentWeather()`

This method is called when the weather module tries to fetch the current weather
of your provider. The implementation of this method is required for current
weather support. The implementation can make use of the already implemented
function `this.fetchData(url, method, data);`, which is returning a promise.
After the response is processed, the current weather information (as a
[WeatherObject](#weatherobject)) needs to be set with
`this.setCurrentWeather(currentWeather);`. It will then automatically refresh
the module DOM with the new data.

### `fetchWeatherForecast()`

This method is called when the weather module tries to fetch the weather of your
provider. The implementation of this method is required for forecast support.
The implementation can make use of the already implemented function
`this.fetchData(url, method, data);`, which is returning a promise. After the
response is processed, the weather forecast information (as an array of
[WeatherObject](#weatherobject)s) needs to be set with
`this.setWeatherForecast(forecast);`. It will then automatically refresh the
module DOM with the new data.

### `fetchWeatherHourly()`

This method is called when the weather module tries to fetch the weather of your
provider. The implementation of this method is required for hourly support. The
implementation can make use of the already implemented function
`this.fetchData(url, method, data);`, which is returning a promise. After the
response is processed, the hourly weather forecast information (as an array of
[WeatherObject](#weatherobject)s) needs to be set with
`this.setWeatherHourly(forecast);`. It will then automatically refresh the
module DOM with the new data.

## Weather Provider instance methods

### `init()`

Called when a weather provider is initialized.

### `setConfig(config)`

Called to set the config, this config is the same as the weather module's
config.

### `start()`

Called when the weather provider is about to start.

#### `currentWeather()`

This returns a WeatherDay object for the current weather.

### `weatherForecast()`

This returns an array of WeatherDay objects for the weather forecast.

### `weatherHourly()`

This returns an array of WeatherDay objects for the hourly weather forecast.

### `fetchedLocation()`

This returns the name of the fetched location or an empty string.

### `setCurrentWeather(currentWeatherObject)`

Set the currentWeather and notify the delegate that new information is
available.

### `setWeatherForecast(weatherForecastArray)`

Set the weatherForecastArray and notify the delegate that new information is
available.

### `setWeatherHourly(weatherHourlyArray)`

Set the weatherHourlyArray and notify the delegate that new information is
available.

### `setFetchedLocation(name)`

Set the fetched location name.

### `updateAvailable()`

Notify the delegate that new weather is available.

### `fetchData(url, method, data)`

A convenience function to make requests. It returns a promise.

## WeatherObject

This object holds all data from your provider for usage in the template.

| Property       | Type     | Value/Unit                                                                                                      |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| date           | `object` | [Moment.js](https://momentjs.com/) object of the time/date.                                                     |
| windSpeed      | `number` | Speed of the wind in metric: `meter/second`                                                                     |
| windDirection  | `number` | Direction of the wind in degrees.                                                                               |
| sunrise        | `object` | [Moment.js](https://momentjs.com/) object of sunrise.                                                           |
| sunset         | `object` | [Moment.js](https://momentjs.com/) object of sunset.                                                            |
| temperature    | `number` | Current temperature in metric `celsius degree`.                                                                 |
| minTemperature | `number` | Lowest temperature of the day in metric `celsius degree`.                                                       |
| maxTemperature | `number` | Highest temperature of the day in metric `celsius degree`.                                                      |
| weatherType    | `string` | Icon name of the weather type. <br> Possible values: [WeatherIcons](https://www.npmjs.com/package/weathericons) |
| humidity       | `number` | Percentage of humidity                                                                                          |
| rain           | `number` | Metric: `millimeters` <br> Imperial: `inches`                                                                   |
| snow           | `number` | Metric: `millimeters` <br> Imperial: `inches`                                                                   |
| precipitation  | `number` | Metric: `millimeters` <br> Imperial: `inches` <br> UK Met Office provider: `percent`                            |

### Current weather

For the current weather object the following properties are required:

- humidity
- sunrise
- sunset
- temperature
- weatherType
- windDirection
- windSpeed

### Weather forecast

For the forecast weather object the following properties are required:

- date
- maxTemperature
- minTemperature
- rain
- weatherType
