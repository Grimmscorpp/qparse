const percent = require("./percent");
const type = require("./type");

function serialize(object) {
  let addParamTo = (array, name, value) => {
    let param = percent.encode(name);

    if (value !== null) {
      if (type.of(value).isString) {
        value = percent.encode(value);
      }
      param += "=" + value;
    }

    array.push(param);
  };

  let serializeWithNestingPrefix = (nestingPrefix, object) => {
    const params = [];

    for (let prop in object) {
      let content = object[prop];

      if (content === undefined) continue;

      let name = nestingPrefix ? nestingPrefix + "." + prop : prop;
      const contentType = type.of(content);

      if (contentType.isObjectNotArrayNotNull) {
        params.push(serializeWithNestingPrefix(name, content));

      } else if (!contentType.isArray) {
        addParamTo(params, name, content);

      } else for (let item of content) {
        addParamTo(params, name, item);
      }
    }

    return params.join("&");
  };

  return serializeWithNestingPrefix("", object);
}

function deserialize(url, parsePrimitives = false) {
  let data = {};
  let nestedNameDetector = /^[_a-z]\w*(?:\.[_a-z]\w*)+$/i;
  let nestedParams = [];

  let addPropTo = (object, prop, value, parsePrimitives) => {
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
  };

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

        } else if (!type.of(ptr[comp]).isObjectNotArrayNotNull) {
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

module.exports = {
  /**
   * Turns an object into a query string.
   *
   * @param {*} object The object to serialize
   *
   * @returns {string} A query string generated from the object
   */

  serialize(object) {
    return serialize(object);
  },

  /**
   * Turns a query string into an object.
   *
   * @param {string} queryString The query string to deserialize
   * @param {boolean} [parsePrimitives=false] When set to `true`, parses primitive types
   *
   * @returns {*} An object representing the query string
   */

  deserialize(queryString, parsePrimitives = false) {
    if (!type.of(queryString).isString) return null;

    return deserialize(queryString, parsePrimitives);
  }
};
