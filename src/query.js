const percent = require("./percent");
const type = require("./type");

/**
 * Represents a query string.
 */

class Query {
  /**
   * Creates a new object representing a query string.
   *
   * @param {string} [queryString=""] An optional query string to objectify
   * @param {boolean} [parsePrimitives=true] When ommitted or set to `true`, attemps to parse primitive types from the supplied query string
   */
  constructor(queryString = "", parsePrimitives = true) {
    /**
     * Encapsulates the query string parameters.
     */
    this.data = queryString === "" ? {} : deserialize(queryString, parsePrimitives);
  }

  /**
   * Returns `true` if the query does not have parameters.
   */
  get isEmpty() {
    return isEmpty(this.data);
  }

  /**
   * Returns `true` if the query contains the specified key.
   *
   * @param {string} key The key to check if exists
   */
  has(key) {
    if (!this.data) return false;
    return this.data[key] !== undefined;
  }

  /**
   * Returns the query string.
   */
  toString() {
    if (isEmpty(this.data)) return "";
    return "?" + serialize(this.data);
  }
}

function isEmpty(data) {
  if (!data) return true;

  for (let prop in data) {
    if (data[prop] !== undefined) return false;
  }

  return true;
}

function serialize(object, nestingPrefix = "") {
  let params = [];

  for (let prop in object) {
    let content = object[prop];

    if (content === undefined) continue;

    let name = nestingPrefix ? nestingPrefix + "." + prop : prop;
    let contentType = type.of(content);

    if (contentType.isObject) {
      params.push(serialize(content, name));

    } else if (!contentType.isArray) {
      addParamTo(params, name, content);

    } else for (let item of content) {
      addParamTo(params, name, item);
    }
  }

  return params.join("&");
}

function addParamTo(array, name, value) {
  let param = percent.encode(name);

  if (value !== null) {
    if (type.of(value).isString) {
      value = percent.encode(value);
    }
    param += "=" + value;
  }

  array.push(param);
}

function deserialize(url, parsePrimitives = false) {
  let data = {};
  let nestedNameDetector = /^[_a-z]\w*(?:\.[_a-z]\w*)+$/i;
  let nestedParams = [];

  parseQueryStringParametersFrom(url, (name, value) => {
    if (nestedNameDetector.exec(name)) {
      nestedParams.push({ name, value });

    } else {
      addPropTo(data, name, value, parsePrimitives);
    }
  });

  if (nestedParams.length !== 0) {
    nestedParams.sort((one, other) => one.name.localeCompare(other.name));

    for (let param of nestedParams) {
      let ptr = data;
      let components = param.name.split(".");
      let prop = components.pop();

      for (let comp of components) {
        if (!ptr.hasOwnProperty(comp)) {
          ptr[comp] = {};

        } else if (!type.of(ptr[comp]).isObject) {
          ptr = data;
          prop = param.name;
          break;
        }

        ptr = ptr[comp];
      }

      addPropTo(ptr, prop, param.value, parsePrimitives)
    }
  }

  return data;
}

function parseQueryStringParametersFrom(url, onParameterParsed) {
  let qIndex = url.indexOf("?");
  if (qIndex < 0) return;

  let paramFinder = /[&?](([^=&#]*)(=?)([^&#]*))(#?)/g;
  paramFinder.lastIndex = qIndex;

  for (let found = null; found = paramFinder.exec(url);) {
    let param = found[1];
    let containsEquals = found[3] === "=";
    let terminatedByHash = found[5] === "#";
    let name = percent.decode(found[2]);
    let value = containsEquals ? percent.decode(found[4]) : null;

    onParameterParsed(name, value, param);

    if (terminatedByHash) break;
  }
}

function addPropTo(object, prop, value, parsePrimitives) {
  if (parsePrimitives) {
    value = type.parsePrimitive(value);
  }

  if (!object.hasOwnProperty(prop)) {
    object[prop] = value;

  } else if (!type.of(object[prop]).isArray) {
    object[prop] = [object[prop], value];

  } else {
    object[prop].push(value);
  }
}

module.exports = Query;
