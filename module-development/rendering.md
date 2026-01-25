# Rendering Component

There are two main approaches to rendering your component. Procedurally
generating a Dom object with `getDom`, or using the built in Nunjucks templating
engine.

With both approaches, rendering is first triggered when the module is first
loaded. When your module's data changes, you can call
[`this.updateDom()`](/module-development/core-module-file.md#this-updatedom-speed-options)
to trigger a re-render.

## Using `getDom`

The `getDom` method is called by MagicMirror whenever it needs to update
information on the screen. This method should return an HTML
[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) which
contains all the information you would like to display.

**Example:**

```js
getDom: function() {
	const wrapper = document.createElement("div");
	wrapper.innerHTML = 'Hello world!';
	return wrapper;
}
```

## Using Nunjucks Templates

If `getDom` is not overridden, MagicMirror will try and render a
[Nunjucks](https://mozilla.github.io/nunjucks/) template from `getTemplate`.

Nunjucks is a templating language for JavaScript. You can read more about the
syntax in the
[Nunjucks Documentation](https://mozilla.github.io/nunjucks/templating.html).

### Templates and Data

Templates are rendered by calling `getTemplate` to get the path to the template
and `getTemplateData` to get the data used in the template.

**Example:**

`MMM-MyModule.js`

```js
getTemplate: function() {
  return "MMM-MyModule.njk";
},

getTemplateData: function() {
  return {
    list: ["item 1", "item 2", "item 3"],
  };
}
```

`MMM-MyModule.njk`

```nunjucks
<ul>
  {% for item in list %}
  <li>{{ item }}</li>
  {% endfor %}
</ul>
```

Rendered HTML:

```html
<ul>
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
</ul>
```

### Filters

[Nunjucks Filters](https://mozilla.github.io/nunjucks/templating.html#filters)
are functions added to Nunjucks that can be applied to variables passed to the
template.

#### `translate` filter

MagicMirror provides a `translate` filter which can be used to access the same
functionality available in the
[`this.translate` module instance method](/module-development/core-module-file.md#this-translate-identifier).

```nunjucks
{{ "INFO" | translate }}
```

#### Adding filters

You can add your own filters by accessing the Nunjucks environment via
`this.nunjucksEnvironment()`

```js
this.nunjucksEnvironment().addFilter("space", function (str) {
  return str.split("").join(" ");
});
```

For filter examples see the
[`weather` module](https://github.com/MagicMirrorOrg/MagicMirror/blob/master/modules/default/weather/weather.js#L221).
