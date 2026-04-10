# Cors Proxy

MagicMirror² contains an internal cors proxy which is useful for some modules.

Since MagicMirror² versions greater `v2.35.0` the cors proxy is disabled by
default due to security reasons.

## What is a cors proxy?

There are some good articles online, e.g.
[What are CORS proxies, and when are they safe?](https://httptoolkit.com/blog/cors-proxies/).

## Why do we need a cors proxy for MagicMirror²?

We ran into cors problems with some modules which make api requests to external
websites from inside the browser.

Examples are

- some news url's when using the default newsfeed module
- 3rd-party modules (e.g. weather api's)
- ...

To get such url's working we can use the internal cors proxy. Instead using the
original url `https://example.com` in the module configuration we use
`/cors?url=https://example.com`. With this the request doesn't go directly from
the browser to the external url but to the MagicMirror² Server which makes the
call to the external url and sends the answer back to the browser.

## Setup cors proxy

You have to enable the cors proxy in `config.js`.

::: warning NOTE

We offer no guarantee that the use of the cors proxy is safe in all setups. We
investigated in security and protecting against misuse, but use at your own
risk.

:::

You can us 2 setup variants.

### Cors allow all

This opens cors to all url's. You should only use this if your MagicMirror² is
not reachable from outside your network:

```js
  cors: "allowAll",
```

### Cors allow whitelist

This is the safest variant. You have to list all domains which are allowed to
make cors requests:

```js
  cors: "allowWhitelist",
  corsDomainWhitelist: ["example.com", "api.mapbox.com"],
```
