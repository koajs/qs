# Koa Querystring

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![iojs version][iojs-image]][iojs-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/koa-qs.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-qs
[travis-image]: https://img.shields.io/travis/koajs/qs.svg?style=flat-square
[travis-url]: https://travis-ci.org/koajs/qs
[coveralls-image]: https://img.shields.io/coveralls/koajs/qs.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/koajs/qs?branch=master
[david-image]: https://img.shields.io/david/koajs/qs.svg?style=flat-square
[david-url]: https://david-dm.org/koajs/qs
[iojs-image]: https://img.shields.io/badge/io.js-%3E=_1.0-yellow.svg?style=flat-square
[iojs-url]: http://iojs.org/
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.11-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/koa-qs.svg?style=flat-square
[download-url]: https://npmjs.org/package/koa-qs

By default, Koa uses the native `querystring` module which does not provide nesting support.
This patches a koa app with nesting support via the [qs] support,
which is also used by Connect and Express.

Simply wrap a koa app with this module:

```js
var koa = require('koa')
var app = koa()
require('koa-qs')(app)
```

## Optional parse mode

There're three parse mode.

## `extended` mode

The default mode, use [qs] module.

```js
require('koa-qs')(app, 'extended')
```

## `simple` mode

Use `querystring` module, same as koa does by default.
If you want to use this mode, don't use this module.

## `strict` mode

This mode make `this.query.foo` return strict `array`.

```js
require('koa-qs')(app, 'strict')
```

#### What's different

A normal request `GET /foo?p=a&q=foo&q=bar`.

- before patch

```js
console.log('%j', this.query);
{
  "p": "a",
  "q": ["foo", "bar"]
}
```

- after patch

```js
console.log('%j', this.query);
{
  "p": ["a"],
  "q": ["foo", "bar"]
}
```

## `first` mode

This mode make `this.query.foo` return strict `string`. Disable multi values.

If querystring contains multi same name params, return the **first** item.

```js
require('koa-qs')(app, 'first')
```

In 95% use cases, application only want `string` query params.

This patch can avoid some stupid `TypeError` and some security issues like [MongoDB inject](http://www.wooyun.org/bugs/wooyun-2010-086474)
when the developers forget handling query params type check.

#### What's different

A normal request `GET /foo?p=a,b&p=b,c`.

- before patch

```js
console.log('%j', this.query.p);
["a,b", "b,c"]
```

- after patch

```js
console.log('%j', this.query.p);
"a,b"
```

## License

[MIT](LICENSE)


[qs]: https://github.com/hapijs/qs
