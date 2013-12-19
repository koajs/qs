# Koa Querystring [![Build Status](https://travis-ci.org/koajs/qs.png)](https://travis-ci.org/koajs/qs)

By default, Koa uses the native `querystring` module which does not provide nesting support. This patches a koa app with nesting support via the [qs](https://github.com/visionmedia/node-querystring) support, which is also used by Connect and Express.

Simply wrap a koa app with this module:

```js
var koa = require('koa')
var app = koa()
require('qs')(app)
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

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.