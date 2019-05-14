const Query = require("./query");
const type = require("./type");

const qparse = {
  /**
   * Returns a new object representing a query string.
   *
   * @param {*} [data] An optional data representing the query string parameters
   * @returns {Query} An object representing the query
   */
  create(data) {
    let query = new Query();

    if (type.of(data).isObject) {
      query.data = data;
    }

    return query;
  },

  /**
   * 
   * @param {string} url The URL from which to parse the query string
   * @param {boolean} parsePrimitives When ommitted or set to `true`, attempts to parse primitive types from the supplied query string
   */
  parse(url, parsePrimitives = true) {
    if (!type.of(url).isString) return new Query();
    return new Query(url, parsePrimitives && true || false);
  }
};

if (typeof window !== "undefined") {
  window.qparse = qparse;
  window.qp = qparse;
}

module.exports = qparse;
