# Current Weather
::: warning
This module has been deprecated in favor of the [Weather-module](/modules/weather.html). See [migration](#migration) for help migrating to the new module.
:::

The `currentweather` module is one of the default modules of the MagicMirror.
This module displays the current weather, including the windspeed, the sunset or sunrise time, the temperature and an icon to display the current conditions.

## Screenshot

- Current weather screenshot
![Current Weather Screenshot](./screenshots/weather_screenshot.png)

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: "currentweather",
		position: "top_right",	// This can be any of the regions.
									// Best results in left or right regions.
		config: {
			// See 'Configuration options' for more information.
			location: "Amsterdam,Netherlands",
			locationID: "", //Location ID from http://bulk.openweathermap.org/sample/city.list.json.gz
			appid: "abcde12345abcde12345abcde12345ab" //openweathermap.org API key.
		}
	}
]
````

## Configuration options

The following properties can be configured:


| Option                       | Description
| ---------------------------- | -----------
| `location`                   | The location used for weather information. <br><br> **Example:** `'Amsterdam,Netherlands'` <br> **Default value:** `false` <br><br> **Note:** When the `location` and `locationID` are both not set, the location will be based on the information provided by the calendar module. The first upcoming event with location data will be used.
| `locationID`                 | Location ID from [OpenWeatherMap](https://openweathermap.org/find) **This will override anything you put in location.** <br> Leave blank if you want to use location. <br> **Example:** `1234567` <br> **Default value:** `false` <br><br> **Note:** When the `location` and `locationID` are both not set, the location will be based on the information provided by the calendar module. The first upcoming event with location data will be used.
| `appid`                      | The [OpenWeatherMap](https://home.openweathermap.org) API key, which can be obtained by creating an OpenWeatherMap account. <br><br>  This value is **REQUIRED**
| `units`                      | What units to use. Specified by config.js <br><br> **Possible values:** `config.units` = Specified by config.js, `default` = Kelvin, `metric` = Celsius, `imperial` =Fahrenheit <br> **Default value:** `config.units`
| `roundTemp`                  | Round temperature value to nearest integer. <br><br> **Possible values:** `true` (round to integer) or `false` (display exact value with decimal point) <br> **Default value:** `false`
| `degreeLabel`                | Show the degree label for your chosen units (Metric = C, Imperial = F, Kelvins = K). <br><br> **Possible values:** `true` or `false` <br> **Default value:** `false`
| `updateInterval`             | How often does the content needs to be fetched? (Milliseconds) <br><br> **Possible values:** `1000` - `86400000` <br> **Default value:** `600000` (10 minutes)
| `animationSpeed`             | Speed of the update animation. (Milliseconds) <br><br> **Possible values:**`0` - `5000` <br> **Default value:** `1000` (1 second)
| `timeFormat`                 | Use 12 or 24 hour format. <br><br> **Possible values:** `12` or `24` <br> **Default value:** uses value of _config.timeFormat_
| `showPeriod`                 | Show the period (am/pm) with 12 hour format <br><br> **Possible values:** `true` or `false` <br> **Default value:** `true`
| `showPeriodUpper`	           | Show the period (AM/PM) with 12 hour format as uppercase <br><br> **Possible values:** `true` or `false` <br> **Default value:** `false`
| `showWindDirection`          | Show the wind direction next to the wind speed. <br><br> **Possible values:** `true` or `false` <br> **Default value:** `true`
| `showWindDirectionAsArrow`   | Show the wind direction as an arrow instead of abbreviation <br><br> **Possible values:** `true` or `false` <br> **Default value:** `false`
| `showHumidity`               | Show the current humidity <br><br> **Possible values:** `true` or `false` <br> **Default value:** `false`
| `showSun`                    | Show sunset and sunrise time <br><br> **Possible values:** `true` or `false` <br> **Default value:** `true`
| `showIndoorTemperature`      | If you have another module that emits the INDOOR_TEMPERATURE notification, the indoor temperature will be displayed <br> **Default value:** `false`
| `onlyTemp`                   | Show only current Temperature and weather icon without windspeed, sunset, sunrise time and feels like. <br><br> **Possible values:** `true` or `false` <br> **Default value:** `false`
| `showFeelsLike`              | Shows the Feels like temperature weather. <br><br> **Possible values:**`true` or `false`<br>**Default value:** `true`
| `useKMPHwind`                | Uses KMPH as units for windspeed. <br><br> **Possible values:**`true` or `false`<br>**Default value:** `false`
| `useBeaufort`                | Pick between using the Beaufort scale for wind speed or using the default units. <br><br> **Possible values:** `true` or `false` <br> **Default value:** `true`
| `lang`                       | The language of the days. <br><br> **Possible values:** `en`, `nl`, `ru`, etc ... <br> **Default value:** uses value of _config.language_
| `decimalSymbol`              | The decimal symbol to use.<br><br> **Possible values:** `.`, `,` or any other symbol.<br> **Default value:** `.`
| `initialLoadDelay`           | The initial delay before loading. If you have multiple modules that use the same API key, you might want to delay one of the requests. (Milliseconds) <br><br> **Possible values:** `1000` - `5000` <br> **Default value:**  `0`
| `retryDelay`                 | The delay before retrying after a request failure. (Milliseconds) <br><br> **Possible values:** `1000` - `60000` <br> **Default value:**  `2500`
| `apiVersion`                 | The OpenWeatherMap API version to use. <br><br> **Default value:**  `2.5`
| `apiBase`                    | The OpenWeatherMap base URL. <br><br> **Default value:**  `'http://api.openweathermap.org/data/'`
| `weatherEndpoint`	           | The OpenWeatherMap API endPoint. <br><br> **Default value:**  `'weather'`
| `appendLocationNameToHeader` | If set to `true`, the returned location name will be appended to the header of the module, if the header is enabled. This is mainly interesting when using calender based weather. <br><br> **Default value:**  `true`
| `useLocationAsHeader`        | If set to `true` and location is given a value, the value of location will be used as the header. This is useful if `locationName` was not returned. <br><br> **Default value:** `false`
| `calendarClass`              | The class for the calender module to base the event based weather information on. <br><br> **Default value:**  `'calendar'`
| `iconTable`                  | The conversion table to convert the weather conditions to weather-icons. <br><br> **Default value:**  view tabel below.

#### Default Icon Table
````javascript
iconTable: {
	'01d': 'wi-day-sunny',
	'02d': 'wi-day-cloudy',
	'03d': 'wi-cloudy',
	'04d': 'wi-cloudy-windy',
	'09d': 'wi-showers',
	'10d': 'wi-rain',
	'11d': 'wi-thunderstorm',
	'13d': 'wi-snow',
	'50d': 'wi-fog',
	'01n': 'wi-night-clear',
	'02n': 'wi-night-cloudy',
	'03n': 'wi-night-cloudy',
	'04n': 'wi-night-cloudy',
	'09n': 'wi-night-showers',
	'10n': 'wi-night-rain',
	'11n': 'wi-night-thunderstorm',
	'13n': 'wi-night-snow',
	'50n': 'wi-night-alt-cloudy-windy'
}
````

## Migration
The following lines needs to be changed when migrating to the new weather module for current weather:
``` json {2,5,8}
	{
		module: "currentweather",
		position: "top_right",
		config: {

			location: "Amsterdam,Netherlands",
			locationID: "",
			appid: "abcde12345abcde12345abcde12345ab"
		}
	}
```
To this:
``` json {2,5,8}
	{
		module: "weather",
		position: "top_right",
		config: {
			type: "current",
			location: "Amsterdam,Netherlands",
			locationID: "",
			apiKey: "abcde12345abcde12345abcde12345ab"
		}
	}
```

Most of the other configuration options should be unchanged and should be available in the new module too, if there's still something missing please open an issue [here](https://github.com/MichMich/MagicMirror/issues/new).
