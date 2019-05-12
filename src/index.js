const Query = require("./query");
const type = require("./type");

const qparse = {
  create(data) {
    let query = new Query();

    if (type.of(data).isObject) {
      query.data = data;
    }

    return query;
  },
  parse(url, parsePrimitives = true) {
    if (!type.of(url).isString) return null;
    return new Query(url, parsePrimitives && true || false);
  }
};

if (typeof window !== "undefined" && window === global) {
  window.qparse = qparse;

  if (!window.hasOwnProperty("qp")) {
    window.qp = qparse;
  }
}

module.exports = qparse;
