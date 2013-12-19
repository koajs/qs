var qs = require('qs')
var merge = require('merge-descriptors')

module.exports = function (app) {
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
      return c[str] || (c[str] = qs.parse(str));
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
  })

  return app
}