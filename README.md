# Koa Querystring [![Build Status](https://travis-ci.org/koajs/qs.png)](https://travis-ci.org/koajs/qs)

By default, Koa uses the native `querystring` module which does not provide nesting support. This patches a koa app with nesting support via the [qs](https://github.com/visionmedia/node-querystring) support, which is also used by Connect and Express.

Simply wrap a koa app with this module:

```js
var koa = require('koa')
var app = koa()
require('koa-qs')(app)
```

Note that this module __does not include qs__. You need to install it on your own. This way, you don't have to worry about upgrading this module. Thus, your `package.json` should look something like this:

```json
{
  "dependencies": {
    "koa-qs": "1.0.0",
    "qs": "0.6.6"
  }
}
```
