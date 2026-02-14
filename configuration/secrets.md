# Secrets

When MagicMirror² was designed, no one thought about secrets.

However, there are plenty of parameters worth protecting, such as:

- API keys (e.g. weather)
- Tokens in URLs
- Private calendar URLs
- Position information (latitude and longitude)
- ...

::: warning NOTE

Due to its design, this data is also displayed in the web browser, 
for example, in the `/config` subpath.

Therefore, be careful when sharing your MagicMirror² website with others.
Anyone with access to the site can also access the secrets.

:::

Beginning with MagicMirror² `v2.35.0` we offer beta support for secrets.

This is based on [environment variables inside the configuration file](/configuration/introduction.html#environment-variables-inside-the-configuration-file).

::: warning NOTE

"Beta" means we offer no guarantee that the methods described below for 
protecting sensitive information will actually work. Use at your own risk.

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

You have to add a new parameter in `config.js`:

```js
let config = {
  ...
  hideConfigSecrets: true,
  ...
};
```

After a restart MagicMirror² will not send environment variables beginning 
with `SECRET_` to the clients (browsers).

### Example

The MMM-Strava module displays activities and needs 2 parameters `client_id` 
and `client_secret` to get the data.

In this example the 2 parameters are set with 2 normal environment variables
`STRAVA_CLIENT_ID` and `STRAVA_API_KEY`:

```js
let config = {
  ...
  hideConfigSecrets: true,
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

This setup is unsafe, you can see the contents of the 2 environment variables
in the browser.

To be safe, you have to use environment variables called `SECRET_STRAVA_CLIENT_ID` 
and `SECRET_STRAVA_API_KEY`. The browser has no access to the content of variables
prefixed with `SECRET_`, the content of e.g. `SECRET_STRAVA_CLIENT_ID` is displayed
as `**SECRET_STRAVA_CLIENT_ID**`.

## Using secrets on the browser-side

Yes, we wrote above that this isn't possible. However, for some applications 
it might work with a workaround.

There are modules that use a map (e.g. MMM-RAIN-MAP, MMM-Flights) and the data 
required for this map is of course retrieved in the browser.

Some map services, such as MapBox, offer free maps, but often require an access 
token in the URL.

Example:

```js
let config = {
  ...
  hideConfigSecrets: true,
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

This will protect the secrets but the modules won't work. The workaround is to use 
the internal cors proxy. This means that the traffic does not go directly from the 
browser to the outside, but first to the MagicMirror² server, which acts as a proxy 
here:

`mapUrl: "/cors?url=https://api.mapbox.com/styles/v1/${SECRET_MAPBOX_ID}/tiles/{z}/{x}/{y}?access_token=${SECRET_MAPBOX_TOKEN}"`

Behind the scenes the server substitutes the variables before fetching the data.