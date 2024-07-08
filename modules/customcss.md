# Custom CSS

MagicMirror² comes with a default theme but it can be customized by placing a
custom css-file in `css/custom.css`.

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
[Clock-module](https://github.com/MagicMirrorOrg/MagicMirror/tree/master/modules/default/clock)
could be customized by using the class `.clock`.

### Help

For questions and inspiration visit the
[forum category](https://forum.magicmirror.builders/category/8/custom-css)
dedicated to this.
