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
  if (!type.of(prefix).isString) {
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

  return params.length === 0 ? "?" + params.join("&") : "";
}

/**
 * Deserializes a query string into an object.
 *
 * @param {string} queryString The query string
 * @returns {*} An object
 */

function deserialize(string) {
  if (!type.of(string).isString) return null;

  const queryString = extractQueryStringFrom(string);

  if (queryString === "") return {};

  const data = {};
  const params = [];

  for (const param of queryString.substring(1).split("&")) {
    const paramName = param.split("=", 1)[0];
    const paramValue = param.substring(paramName.length + 1);
    params.push({
      name: percent.decode(paramName),
      value: percent.decode(paramValue)
    });
  }

  params.sort((a, b) => a.name.localeCompare(b.name));

  const validVarName = "[_a-zA-Z]\\w*";
  const dotSeparatedVarsFinder = new RegExp("^" + validVarName + "(?:\\." + validVarName + ")+$");

  for (const param of params) {
    const paramName = param.name;
    const paramValue = param.value;

    let ptr = data;
    let prop = paramName;

    if (dotSeparatedVarsFinder.exec(paramName)) {
      const components = paramName.split(".");
      prop = components.pop();

      for (const comp of components) {
        if (!ptr.hasOwnProperty(comp)) {
          ptr[comp] = {};

        } else if (!type.of(ptr[comp]).isObject) {
          ptr = data;
          prop = paramName;
          break;
        }

        ptr = ptr[comp];
      }
    }

    if (!ptr.hasOwnProperty(prop)) {
      ptr[prop] = paramValue;

    } else if (!type.of(ptr[prop]).isArray) {
      ptr[prop] = [ptr[prop], paramValue];

    } else {
      ptr[prop].push(paramValue);
    }
  }

  return data;
}

/**
 * Extracts the query string (if any) from a URL.
 *
 * @param {string} url The URL
 * @returns {string} The query string
 */

function extractQueryStringFrom(url) {
  const name = "[^=&#]*";
  const value = "[^&#]*";
  const param = name + "=" + value;
  const queryStringPattern = "\\?" + param + "(?:&" + param + ")*";

  let match = new RegExp(queryStringPattern).exec(url);

  return match && match[0] || "";
}

module.exports = {
  serialize,
  deserialize
};
