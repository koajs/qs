var merge = require('merge-descriptors');

module.exports = function (app, mode) {
  mode = mode || 'extended';
  var qs = require('querystring');
  if (mode === 'extended') {
    qs = require('qs');
  }
  var converter = null;
  if (mode === 'strict') {
    converter = function (value) {
      if (!Array.isArray(value)) {
        return [value];
      }
      return value;
    };
  } else if (mode === 'first') {
    converter = function (value) {
      if (Array.isArray(value)) {
        return value[0];
      }
      return value;
    };
  }

  merge(app.request, {

    /**
     * Get parsed query-string.
     *
     * @return {Object}
     * @api public
     */

    get query() {
      var str = this.querystring;
      if (!str) return {};

      var c = this._querycache = this._querycache || {};
      var query = c[str];
      if (!query) {
        c[str] = query = qs.parse(str);
        if (converter) {
          for (var key in query) {
            query[key] = converter(query[key]);
          }
        }
      }
      return query;
    },

    /**
     * Set query-string as an object.
     *
     * @param {Object} obj
     * @api public
     */

    set query(obj) {
      this.querystring = qs.stringify(obj);
    },
  });

  return app;
};
