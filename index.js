var merge = require('merge-descriptors');

module.exports = function (app, mode) {
  mode = mode || 'extended';
  var qs = require('querystring');
  if (mode === 'extended') {
    qs = require('qs');
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
        if (mode === 'strict') {
          // return string params only, disable multi values
          for (var key in query) {
            var value = query[key];
            if (Array.isArray(value)) {
              query[key] = value[0];
            }
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
