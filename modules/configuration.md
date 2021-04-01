# Module Configuration

The module configuration is used as part of the main configuration file. Please see [configuration](/getting-started/configuration.md) for more information.

| **Option** | **Description** |
| ---------- | --------------- |
| `module`   | The name of the module. This can also contain the subfolder. Valid examples include `clock`, `default/calendar` and `custommodules/mymodule`. |
| `position` | The location of the module in which the module will be loaded. Possible values are `top_bar`, `top_left`, `top_center`, `top_right`, `upper_third`, `middle_center`, `lower_third`, `bottom_left`, `bottom_center`, `bottom_right`, `bottom_bar`, `fullscreen_above`, and `fullscreen_below`. This field is optional but most modules require this field to set. Check the documentation of the module for more information. Multiple modules with the same position will be ordered based on the order in the configuration file. |
| `classes`  | A list of additional CSS classes which will be set on the module. This field is optional. |
| `header`   | To display a header text above the module, add the header property. This field is optional. |
| `hiddenOnStartup` | Set module as being hidden on startup.  This field is optional. |
| `disabled` | Set disabled to `true` to skip creating the module. This field is optional. |
| `config`   | An object with the module configuration properties. Check the documentation of the module for more information. This field is optional, unless the module requires extra configuration. |

## Example

```{2-19}
var config = {
	modules: [
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "New York",
				appid: "YOUR_OPENWEATHER_API_KEY"
			}
		}
	]
}
```
