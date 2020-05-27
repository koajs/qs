const merge = require('merge-descriptors');

module.exports = function (app, mode, options) {
  mode = mode || 'extended';
  const qs = (mode === 'extended') ? require('qs') : require('querystring');

  const converter = (
    mode === 'strict' && function (value) { return !Array.isArray(value) ? [value] : value }
    ||
    mode === 'first' && function (value) { return Array.isArray(value) ? value[0] : value }
  );

  merge(app.request, {

    /**
     * Get parsed query-string.
     *
     * @return {Object}
     * @api public
     */
    get query() {
      let str = this.querystring;
      if (!str) return {};

      let c = this._querycache = this._querycache || {};
      let query = c[str];
      if (!query) {
        c[str] = query = qs.parse(str, options);
        if (converter) {
          for (let key in query) {
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