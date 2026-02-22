# Compliments

The `compliments` module is one of the default modules of the MagicMirror. This
module displays a random compliment.

## Screenshot

![Compliments Screenshot](./screenshots/compliments.png)

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```js
    {
      module: "compliments",
      position: "lower_third", // This can be any of the regions.
      // Best results in one of the middle regions like: lower_third
      config: {
        // The config property is optional.
        // If no config is set, the default compliments are shown.
        // See 'Configuration options' for more information.
      },
    },
```

## Configuration options

The following properties can be configured:

| Option                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateInterval`            | How often does the compliment have to change? (Milliseconds) <br><br> **Possible values:** `1000` - `86400000` <br> **Default value:** `30000` (30 seconds)                                                                                                                                                                                                                                                                                                      |
| `fadeSpeed`                 | Speed of the update animation. (Milliseconds) <br><br> **Possible values:**`0` - `5000` <br> **Default value:** `4000` (4 seconds)                                                                                                                                                                                                                                                                                                                               |
| `compliments`               | The list of compliments. <br><br> **Possible values:** An object with four arrays: `morning`, `afternoon`, `evening` and `anytime`. See _compliment configuration_ below. <br> **Default value:** See _compliment configuration_ below.                                                                                                                                                                                                                          |
| `remoteFile`                | External file from which to load the compliments <br><br> **Possible values:** URL (starting with `http://` or `https://`) or a **relative path** to a JSON file containing compliments. A relative path is resolved relative to the compliments module directory (`modules/default/compliments/`), so a file placed in the MagicMirror root would be referenced as `"../../compliments.json"`. Absolute filesystem paths are not supported. <br><br> The JSON file must contain an object with at least one of the arrays: `morning`, `afternoon`, `evening`, `anytime`, `datetype` and/or `crontype`. <br> **Default value:** `null` (Do not load from file) |
| `remoteFileRefreshInterval` | How often to reload the remote file, if remoteFile is specified. in ms <br> **Default value:** 0 <br> **Minimum value:** 15 minutes (15\*60\*1000)                                                                                                                                                                                                                                                                                                               |
| `classes`                   | Override the CSS classes of the div showing the compliments <br><br> **Default value:** `thin xlarge bright`                                                                                                                                                                                                                                                                                                                                                     |
| `morningStartTime`          | Time in hours (in 24 format), after which the mode of "morning" will begin <br> **Possible values:** `0` - `24` <br><br> **Default value:** `3`                                                                                                                                                                                                                                                                                                                  |
| `morningEndTime`            | Time in hours (in 24 format), after which the mode of "morning" will end <br> **Possible values:** `0` - `24` <br><br> **Default value:** `12`                                                                                                                                                                                                                                                                                                                   |
| `afternoonStartTime`        | Time in hours (in 24 format), after which the mode "afternoon" will begin <br> **Possible values:** `0` - `24` <br><br> **Default value:** `12`                                                                                                                                                                                                                                                                                                                  |
| `afternoonEndTime`          | Time in hours (in 24 format), after which the mode "afternoon" will end <br> **Possible values:** `0` - `24` <br><br> **Default value:** `17`                                                                                                                                                                                                                                                                                                                    |
| `specialDayUnique`          | Compliments configured with a date are by default added to the existing compliments list. Setting this option to `true` will show only your special day compliments on that day. See _Example use with date_ below <br><br> **Default value:** `false`                                                                                                                                                                                                           |

All the rest of the time that does not fall into the
morningStartTime-morningEndTime and afternoonStartTime-afternoonEndTime ranges
is considered "evening".

### Compliment configuration

The `compliments` property contains an object with at least four arrays:

<code>morning</code>, <code>afternoon</code>, <code>evening</code> and
<code>anytime</code>. Based on the time of the day, the compliments will be
picked out of one of these arrays. The arrays contain one or multiple
compliments.

Compliments can be set for a specific day in the format `YYYY-MM-DD`. `.` can be
used as a wildcard.

starting in Version 2.29, the compliments configuration can use a cron type
specification, which provides more options. In addition to date, one can use
hours, minutes and day of week for additional control the cron format string is
5 groups of space separated values<br><br> **minute hour day month
day_of_week**<br><br> each can be a range, and use numbers or names see
https://crontab-generator.org for a visual cron syntax creator.. this tool asks
for the command to be executed (cron is usually used to execute commands on a
schedule), just use anything, and take the first 5 space separated tokens of the
result.

If set, the weather can be used for compliments. The available properties are:

- `day_sunny`
- `day_cloudy`
- `cloudy`
- `cloudy_windy`
- `showers`
- `rain`
- `thunderstorm`
- `snow`
- `fog`
- `night_clear`
- `night_cloudy`
- `night_showers`
- `night_rain`
- `night_thunderstorm`
- `night_snow`
- `night_alt_cloudy_windy`

#### Example use with date

```js
    config: {
      compliments: {
        "....-01-01": [
          "Happy new year!"
        ],
        "....-10-31": [
          "Happy Halloween!"
        ]
      }
    }
```

#### Example use with a cron entry

```js
    config: {
      compliments: {
        "48-50 16-18 * * 5,6": [
          "Happy Hour!", "Its a Party"
        ]
      }
    }
```

this means, on Friday or Saturday, every week (\* (every) month/day) between
16:48-16:50, 17:48-17:50, and 18:48-18:50, the assigned messages will be used.
note: like with the date only setting, if these are the only possible messages
you want displayed, you need to set **specialDayUnique:true**

As another example you could use this for scary messages ONLY between 8 and 9pm
on Halloween evening:

```js
    config: {
        compliments: {
            "* 20-21 31 10 *": [
                "Boo!!"
            ]
        }
    }
```

#### Example use with weather module

```js
    config: {
      compliments: {
        day_sunny: [
          "Today is a sunny day",
          "It's a beautiful day"
        ],
        snow: [
          "Snowball battle!"
        ],
        rain: [
          "Don't forget your umbrella"
        ]
      }
    }
```

#### Default value:

```js
    config: {
      compliments: {
        anytime: [
          "Hey there sexy!"
        ],
        morning: [
          "Good morning, handsome!",
          "Enjoy your day!",
          "How was your sleep?"
        ],
        afternoon: [
          "Hello, beauty!",
          "You look sexy!",
          "Looking good today!"
        ],
        evening: [
          "Wow, you look hot!",
          "You look nice!",
          "Hi, sexy!"
        ],
        "....-01-01": [
          "Happy new year!"
        ]
      }
    }
```

#### Multi-line compliments:

Use `\n` to split compliment text into multiple lines, e.g.
`First line.\nSecond line.` will be shown as:

```
First line.
Second line.
```

### External Compliment File

You may specify an external file that contains the three compliment arrays. This
is particularly useful if you have a large number of compliments and do not wish
to crowd your `config.js` file with a large array of compliments. Adding the
`remoteFile` variable will override an array you specify in the configuration
file.

This file must be straight JSON. Note that the array names need quotes around
them ("morning", "afternoon", "evening", "snow", "rain", etc.).

#### Example config/config.js of a Compliment File hosted on GitHub

```js
    {
    module: 'compliments',
    position: 'middle_center',
      config: {
        remoteFile: 'https://gist.githubusercontent.com/user/e28a69665b8839f6e9a7acd6b4acc97d/raw/be1dee8f805a433f6ee0fa3556d1927da14e7799/compliments.json'
      }
    },
```

(When copying the link from Github, you must use the 'Raw' link)

#### Example compliments.json file:

```json
{
  "anytime": ["Hey there sexy!"],
  "morning": [
    "Good morning, sunshine!",
    "Who needs coffee when you have your smile?",
    "Go get 'em, Tiger!"
  ],
  "afternoon": [
    "Hitting your stride!",
    "You are making a difference!",
    "You're more fun than bubble wrap!"
  ],
  "evening": [
    "You made someone smile today, I know it.",
    "You are making a difference.",
    "The day was better for your efforts."
  ]
}
```
