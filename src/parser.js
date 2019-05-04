const percent = require("./percent");
const type = require("./type");

/**
 * Serializes a given object into a set of `&` separated `name=value` pairs.
 * @param {*} object The object to serialize
 * @param {string} [prefix] An optional prefix to prepend to the `names`
 * @returns {string} The object serialized
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

function deserialize(string) {

}

module.exports = {
  serialize,
  deserialize
};
