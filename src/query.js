const percent = require("./percent");
const type = require("./type");

/**
 * Serializes an object into a query string.
 *
 * @param {*} object The object
 * @param {string} [prefix] An optional prefix to prepend to the parameter names
 * of the query string
 * @returns {string} A query string
 */

function serialize(object, prefix) {
  if (typeof prefix !== "string") {
    prefix = "";
  }

  const params = [];

  for (let prop in object) {
    let name = prefix + prop;
    let content = object[prop];
    const contentType = type.of(content);

    if (contentType.isObject) {
      params.push(serialize(content, name + "."));

    } else {
      name = percent.encode(name);

      if (contentType.isArray) {
        for (let item of content) {
          if (type.of(item).isString) {
            item = percent.encode(item);
          }
          params.push(name + "=" + item);
        }
      } else {
        if (contentType.isString) {
          content = percent.encode(content);
        }
        params.push(name + "=" + content);
      }
    }
  }

  return params.join("&");
}

/**
 * Deserializes a query string into an object.
 *
 * @param {string} queryString The query string
 * @returns {*} An object
 */

function deserialize(queryString) {
  if (!type.of(queryString).isString) {
    return null;
  }

  // TODO: Continue the implementation here...
}

/**
 * Extracts the query string (if any) from a URL.
 *
 * @param {string} url The URL
 * @returns {string} The query string
 */

function extractFrom(url) {
  const name = "[^=&#]+";
  const value = "[^=&#]+";
  const param = name + "=" + value;
  const queryStringPattern = "\\?" + param + "(?:&" + param + ")*";

  let match = new RegExp(queryStringPattern).exec(url);

  return match && match[0] || "";
}

module.exports = {
  serialize,
  deserialize,
  extractFrom
};
