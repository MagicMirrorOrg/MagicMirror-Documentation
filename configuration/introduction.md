# Introduction

### Configuring your MagicMirror

1. Copy `/home/pi/MagicMirror/config/config.js.sample` to `/home/pi/MagicMirror/config/config.js`. \
   **Note:** If you used a third-party installer script, this step may already have been done for you.

2. Modify your required settings. \
   **Note:** You can check your configuration running `npm run config:check` in `/home/pi/MagicMirror`.

The following properties can be configured:

| **Option**         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `port`             | The port on which the MagicMirror² server will run on. The default value is `8080`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `address`          | The _interface_ ip address on which to accept connections. The default is `localhost`, which would prevent exposing the built-in webserver to machines on the local network. To expose it to other machines, use: `0.0.0.0`.                                                                                                                                                                                                                                                                                                                              |
| `ipWhitelist`      | The list of IPs from which you are allowed to access the MagicMirror². The default value is `["127.0.0.1", "::ffff:127.0.0.1", "::1"]`, which is from `localhost` only. Add your IP when needed. You can also specify IP ranges with subnet masks (`["127.0.0.1", "127.0.0.1/24"]`) or directly with (`["127.0.0.1", ["192.168.0.1", "192.168.0.100"]]`). Set `[]` to allow all IP addresses. For more information see: [follow post ipWhitelist HowTo](https://forum.magicmirror.builders/topic/1326/ipwhitelist-howto)                                  |
| `zoom`             | This allows to scale the mirror contents with a given zoom factor. The default value is `1.0`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `language`         | The language of the interface. (Note: Not all elements will be localized.) Possible values are `en`, `nl`, `ru`, `fr`, etc., but the default value is `en`.                                                                                                                                                                                                                                                                                                                                                                                               |
| `timeFormat`       | The form of time notation that will be used. Possible values are `12` or `24`. The default is `24`.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `units`            | The units that will be used in the default weather modules. Possible values are `metric` or `imperial`. The default is `metric`.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `modules`          | An array of active modules. **The array must contain objects. See [module configuration](/modules/configuration.md) for more information.**                                                                                                                                                                                                                                                                                                                                                                                                               |
| `electronOptions`  | An optional array of Electron (browser) options. This allows configuration of e.g. the browser screen size and position (example: `electronOptions: { fullscreen: false, width: 800, height: 600 }`). Kiosk mode can be enabled by setting `kiosk: true`, `autoHideMenuBar: false` and `fullscreen: false`. More options can be found [here](https://github.com/electron/electron/blob/master/docs/api/browser-window.md).                                                                                                                                |
| `electronSwitches` | An optional array of Electron switches. This allows configuration of electron app itself. <br> This properties will not affect the `serveronly` mode. Usually normal `MM` users don't need this property, but if you are a hard-core hacker, you might need this to handle Electron itself over `MagicMirror` provides. More options can be found [here](https://www.electronjs.org/docs/latest/api/command-line-switches) (Not all available switches are described there.)<br>example:`electronSwitches:["enable-transparent-visuals", "disable-gpu"];` |
| `customCss`        | The path of the `custom.css` stylesheet. The default is `css/custom.css`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### Environment variables

As the `config.js` is javascript code there is no direct way to provide environment variables. This feature was requested by some users, e.g. with environment variables it is easier to share the configuration with others (otherwise you have to delete all private data as e.g. api keys). There was a longer [discussion on github](https://github.com/MichMich/MagicMirror/issues/1756) where you can read the full story.

#### `config.js` and `config.js.template`

You can provide a `config.js.template` instead of a `config.js` file. The difference is, that you can use environment variables in the `config.js.template`. When starting MagicMirror² a `config.js` is created from `config.js.template` and the variables are resolved.

Variables must be inserted as `${MY_VARIABLE}`, examples:

`config.js.template`:

```javascript
let config = {
	address: "${MY_ADDRESS}",
	port: ${MY_PORT},
	useHttps: ${MY_HTTPS},
};
/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
```

would become

`config.js`:

```javascript
let config = {
  address: "localhost",
  port: 8080,
	useHttps: false,
};
/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
```

#### Providing environment variables

There are 2 ways for declaring them, you can mix both. If a variable is declared in both ways the one declared as linux environment variable is used.

##### Using a `config.env` file

This file must be in the same folder as the `config.js.template` and contains the variables, example from above:

File content of `config.env`:

```
MY_ADDRESS=localhost
MYPORT=8080
MY_HTTPS=false
```

##### Using linux environment variables

You have to declare them before you start MagicMirror², e.g. by executing:

```shell
export MY_ADDRESS=localhost
export MYPORT=8080
export MY_HTTPS=false
```

#### Real world example of `config.js.template`

```javascript
let config = {
  address: "0.0.0.0",
  port: 8080,
  ipWhitelist: [],

  language: "de",
  logLevel: ["INFO", "LOG", "WARN", "ERROR"],
  timeFormat: 24,
  units: "metric",

  modules: [
    {
      module: "MMM-RAIN-MAP",
      position: "bottom_left",
      config: {
        animationSpeedMs: 400,
        colorizeTime: false,
        defaultZoomLevel: 8,
        displayTime: true,
        displayClockSymbol: true,
        displayOnlyOnRain: false,
        extraDelayLastFrameMs: 2000,
        markers: [
          { lat: ${LAT}, lng: ${LON}, color: "black" },
        ],
        mapPositions: [
          { lat: ${LAT}, lng: ${LON}, zoom: 9, loops: 1 },
          { lat: ${LAT}, lng: ${LON}, zoom: 8, loops: 1 },
          { lat: ${LAT}, lng: ${LON}, zoom: 7, loops: 1 },
          { lat: ${LAT}, lng: ${LON}, zoom: 6, loops: 1 },
        ],
        mapUrl: "${MAPBOX_URL}",
        mapHeight: "320px",
        mapWidth: "520px",
        updateIntervalInSeconds: 300,
      }
    },
    {
      module: "MMM-Strava",
      header: "Strava",
      position: "bottom_left",
      config: {
        client_id: "16228",
        client_secret: "${STRAVA_API_KEY}",
        activities: ["ride"],
        period: "recent",
        stats: ["count", "distance", "elevation", "achievements"],
        auto_rotate: true,
        updateInterval: 20000,
        reloadInterval: 3600000,
        showPrivateStats: true,
        limitPrivateStats: 1200,
        digits: 0
      }
    },
    {
      module: "MMM-OpenWeatherForecast",
      header: "Wetter",
      position: "top_center",
      config: {
        apikey: "${OPENWEATHER_API_KEY}",
        latitude: "${LAT}",
        longitude: "${LON}",
        showHourlyForecast: false,
        colored: false,
        iconset: "3c",
        label_days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        concise: false,
        forecastHeaderText: "",
        label_sunriseTimeFormat: "k:mm",
        label_high: "",
        label_low: "",
        displayKmhForWind: true
      }
    },
    {
      module: "calendar",
      header: "Termine",
      position: "top_right",
      config: {
        timeFormat: "absolute",
        showEnd: false,
        dateFormat: "DD.MM.",
        maximumEntries: 10,
        maximumNumberOfDays: 70,
        colored: true,
        calendars: [
          {
            symbol: "subway",
            url: "${CAL_URL1}"
          },
          {
            symbol: "cake-candles",
            url: "${CAL_URL2}"
          },
          {
            symbol: "angle-right",
            color: "#999999",
            url: "${CAL_URL3}"
          }
        ]
      }
    },
  ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
```
