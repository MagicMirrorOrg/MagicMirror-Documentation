# Custom CSS

MagicMirror² comes with a default theme but it can be customized by placing a
custom CSS file at `config/custom.css`. You can start with
[`config/custom.css.sample`](https://github.com/MagicMirrorOrg/MagicMirror/blob/master/config/custom.css.sample)
as an example of how to override the default variables.

```sh
cp config/custom.css.sample config/custom.css
```

The base CSS file for MagicMirror² is located at
[`css/main.css`](https://github.com/MagicMirrorOrg/MagicMirror/blob/master/css/main.css).

Each module can then have their own CSS styles located in their respective
folders. For example the `weather` modules has its own CSS file located at
[`defaultmodules/weather/weather.css`](https://github.com/MagicMirrorOrg/MagicMirror/blob/master/defaultmodules/weather/weather.css)

The `custom.css` file is loaded after all the default CSS files, so any styles
you add there will override the default styles. You should not edit any of the
default files directly.

### Example

One common request is to make the weather icons colorful, this can easily be
achieved in the custom css, this makes the sunny weather icon yellow:

```css
.wi-day-sunny {
  color: #ffff00;
}
```

MagicMirror² uses these weather icons:
[https://erikflowers.github.io/weather-icons/](http://erikflowers.github.io/weather-icons/).
On that page you can find what class name is used for the displayed icon and add
it to your `custom.css`-file like in the example above.

### Target a specific module

Each module has a class set for the div it resides in named after the module
(including all the 3rd-party modules). As an example the
[Clock-module](https://github.com/MagicMirrorOrg/MagicMirror/tree/master/defaultmodules/clock)
could be customized by using the class `.clock`.

### Help

For questions and inspiration visit the
[forum category](https://forum.magicmirror.builders/category/8/custom-css)
dedicated to this.
