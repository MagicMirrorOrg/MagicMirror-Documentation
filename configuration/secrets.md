# Secrets

When MagicMirror² was designed, no one thought about secrets.

However, there are plenty of parameters worth protecting, such as:

- API keys (e.g. weather)
- Tokens in URLs
- Private calendar URLs
- Position information (latitude and longitude)
- ...

::: warning NOTE

MagicMirror² always sends a redacted configuration to the web browser. Raw
configuration files are never served.

:::

Beginning with MagicMirror² `v2.35.0` we offer support for secrets.

This is based on
[environment variables inside the configuration file](/configuration/introduction.html#environment-variables-inside-the-configuration-file).

::: warning NOTE

Secret values are only protected when they are used by server-side modules or
through the internal CORS proxy. Always review the modules you install.

:::

## Different module types

There are two types of modules in MagicMirror²:

- browser-only
- server-side and browser-side

Why is this mentioned? Because secrets can only be protected server-side.

::: warning NOTE

In any case, you should carefully examine the modules you are using.
Theoretically, a malicious module could intercept the entire configuration,
including all secrets, and send it somewhere else.

:::

## Using secrets in server-side modules

### Example

The MMM-Strava module displays activities and needs 2 parameters `client_id` and
`client_secret` to get the data.

In this example the 2 parameters are set with 2 normal environment variables
`STRAVA_CLIENT_ID` and `STRAVA_API_KEY`:

```js
const config = {
  ...
  ...
  modules: [
    {
      module: "MMM-Strava",
      header: "Strava",
      position: "bottom_left",
      config: {
        client_id: "${STRAVA_CLIENT_ID}",
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
  ...
  ]
};
```

This setup is unsafe because the values are sent to the browser. To keep them
server-side, use environment variables called `SECRET_STRAVA_CLIENT_ID` and
`SECRET_STRAVA_API_KEY`. The browser receives placeholders such as
`**SECRET_STRAVA_CLIENT_ID**` instead of the secret values.

## Using secrets on the browser-side

Browser-side modules cannot receive secret values directly. For some
applications, the internal CORS proxy provides a safe workaround.

There are modules that use a map (e.g. MMM-RAIN-MAP, MMM-Flights) and the data
required for this map is of course retrieved in the browser.

Some map services, such as MapBox, offer free maps, but often require an access
token in the URL.

Example:

```js
const config = {
  ...
  cors: "allowWhitelist",
  corsDomainWhitelist: ["api.mapbox.com"],
  ...
  modules: [
    {
      module: "MMM-Flights",
      position: "top_left",
      config: {
        mapUrl: "https://api.mapbox.com/styles/v1/username/mapId/tiles/{z}/{x}/{y}?access_token=abc"
      },
    },
  ...
  ]
};
```

To protect sensitive information in the above url you can change it to

`mapUrl: "https://api.mapbox.com/styles/v1/${SECRET_MAPBOX_ID}/tiles/{z}/{x}/{y}?access_token=${SECRET_MAPBOX_TOKEN}"`

This will protect the secrets but the modules won't work. The workaround is to
use the internal cors proxy. This means that the traffic does not go directly
from the browser to the outside, but first to the MagicMirror² server, which
acts as a proxy here:

`mapUrl: "/cors?url=https://api.mapbox.com/styles/v1/${SECRET_MAPBOX_ID}/tiles/{z}/{x}/{y}?access_token=${SECRET_MAPBOX_TOKEN}"`

Behind the scenes the server substitutes the variables before fetching the data.

::: warning NOTE

You must whitelist every domain you use as cors url. Therefore, in the example
above, we need to set

```js
  cors: "allowWhitelist",
  corsDomainWhitelist: ["api.mapbox.com"],
```

:::
