# Module Configuration

The module configuration is used as part of the main configuration file. Please
see [configuration](/configuration/introduction.md) for more information.

| **Option**        | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `module`          | The name of the module. This can also contain the subfolder. Valid examples include `clock`, `default/calendar` and `custommodules/mymodule`.                                                                                                                                                                                                                                                                                                                                                                                      |
| `position`        | The location of the module in which the module will be loaded. Possible values are `top_bar`, `top_left`, `top_center`, `top_right`, `upper_third`, `middle_center`, `lower_third`, `bottom_left`, `bottom_center`, `bottom_right`, `bottom_bar`, `fullscreen_above`, and `fullscreen_below`. This field is optional but most modules require this field to set. Check the documentation of the module for more information. Multiple modules with the same position will be ordered based on the order in the configuration file. |
| `classes`         | A list of additional CSS classes which will be set on the module. This field is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `header`          | To display a header text above the module, add the header property. This field is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `hiddenOnStartup` | Set module as being hidden on startup. This field is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `disabled`        | Set disabled to `true` to skip creating the module. This field is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `configDeepMerge` | Allow to merge with internal configuration in deep (Array and/with object). This field is optional (on developer choice generaly).                                                                                                                                                                                                                                                                                                                                                                                                 |
| `animateIn`       | Special animate name when a module appears (see below) This field is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `animateOut`      | Special animates name when a module should hide (see below) This field is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `config`          | An object with the module configuration properties. Check the documentation of the module for more information. This field is optional, unless the module requires extra configuration.                                                                                                                                                                                                                                                                                                                                            |

## Example

```javascript
let config = {
  modules: [
    {
      module: "clock",
      position: "top_left",
    },
    {
      module: "compliments",
      position: "lower_third",
    },
    {
      module: "weather",
      position: "top_right",
      config: {
        weatherProvider: "openweathermap",
        type: "current",
        location: "New York",
        locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
        apiKey: "YOUR_OPENWEATHER_API_KEY",
      },
    },
  ],
};
```

## Position

The locations can be found in the following screenshot by their color:

- `top_bar` and `bottom_bar` are light gray
- `top_left` and `bottom_left` are red
- `top_center` and `bottom_center` are blue
- `top_right` and `bottom_right` are green
- `upper_third` is yellow
- `middle_center` is cyan
- `lower_third` is magenta

![Screenshot of Regions](./screenshots/regions.png)

Missing are the fullscreen_below and fullscreen_above as those cover the whole
screen, one under everything else and the other above.

All these regions will resize as needed.

## Animates

Animated feature allows to define an animation to a module

- `animateIn`: When module appears
- `animateOut`: When module should hide

::: tip Preview of animates
Just check the [animate.css](https://animate.style/) library to see a preview of the animation name result
:::

### animateIn

Special animation available:

- bounce
- flash
- pulse
- rubberBand
- shakeX
- shakeY
- headShake
- swing
- tada
- wobble
- jello
- heartBeat
- backInDown
- backInLeft
- backInRight
- backInUp
- bounceIn
- bounceInDown
- bounceInLeft
- bounceInRight
- bounceInUp
- fadeIn
- fadeInDown
- fadeInDownBig
- fadeInLeft
- fadeInLeftBig
- fadeInRight
- fadeInRightBig
- fadeInUp
- fadeInUpBig
- fadeInTopLeft
- fadeInTopRight
- fadeInBottomLeft
- fadeInBottomRight
- flip
- flipInX
- flipInY
- lightSpeedInRight
- lightSpeedInLeft
- rotateIn
- rotateInDownLeft
- rotateInDownRight
- rotateInUpLeft
- rotateInUpRight
- jackInTheBox
- rollIn
- zoomIn
- zoomInDown
- zoomInLeft
- zoomInRight
- zoomInUp
- slideInDown
- slideInLeft
- slideInRight
- slideInUp

### animateIn

Special animation available:

- backOutDown
- backOutLeft
- backOutRight
- backOutUp
- bounceOut
- bounceOutDown
- bounceOutLeft
- bounceOutRight
- bounceOutUp
- fadeOut
- fadeOutDown
- fadeOutDownBig
- fadeOutLeft
- fadeOutLeftBig
- fadeOutRight
- fadeOutRightBig
- fadeOutUp
- fadeOutUpBig
- fadeOutTopLeft
- fadeOutTopRight
- fadeOutBottomRight
- fadeOutBottomLeft
- flipOutX
- flipOutY
- lightSpeedOutRight
- lightSpeedOutLeft
- rotateOut
- rotateOutDownLeft
- rotateOutDownRight
- rotateOutUpLeft
- rotateOutUpRight
- hinge
- rollOut
- zoomOut
- zoomOutDown
- zoomOutLeft
- zoomOutRight
- zoomOutUp
- slideOutDown
- slideOutLeft
- slideOutRight
- slideOutUp

### Example with `newsfeed` module

For this example, news will come from the left (`slideInLeft` animation), wait in the middle, and exit from the right (`slideOutRight` animation)

![animateCSS](./screenshots/animate.gif)

```javascript
{
  module: "newsfeed",
  position: "bottom_bar",
  animateIn: "slideInLeft",
  animateOut: "slideOutRight",
  config: {
    feeds: [
      {
        title: "New York Times",
        url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
      }
    ],
    showSourceTitle: true,
    showPublishDate: true,
    broadcastNewsFeeds: true,
    broadcastNewsUpdates: true
  }
},
```
