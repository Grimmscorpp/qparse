class Type {
  constructor(thing) {
    switch (typeof thing) {
      case "string":
        var isString = true;
        break;
      case "number":
        if (thing === NaN) {
          var isNaN = true;

        } else {
          var isNumber = true;
        }
        break;
      case "bigint":
        var isBigInt = true;
        break;
      case "boolean":
        var isBoolean = true;
        break;
      case "symbol":
        var isSymbol = true;
        break;
      case "undefined":
        var isUndefined = true;
        break;
      case "object":
        if (Array.isArray(thing)) {
          var isArray = true;

        } else if (thing === null) {
          var isNull = true;

        } else {
          var isObject = true;
        }
        break;
      case "function":
        var isFunction = true;
        break;
    }

    this.isString = isString || false;
    this.isNaN = isNaN || false;
    this.isNumber = isNumber || false;
    this.isBigInt = isBigInt || false;
    this.isBoolean = isBoolean || false;
    this.isSymbol = isSymbol || false;
    this.isUndefined = isUndefined || false;
    this.isArray = isArray || false;
    this.isNull = isNull || false;
    this.isObject = isObject || false;
    this.isFunction = isFunction || false;
  }
}

function castIntoPrimitive(thing) {
  let normalizedValue = thing;

  let number = Number.parseFloat(thing);

  if (number !== NaN && number.toString() === thing) {
    normalizedValue = number;

  } else if (thing === "true") {
    normalizedValue = true;

  } else if (thing === "false") {
    normalizedValue = false;
  }

  return normalizedValue;
}

module.exports = {
  /**
   * Gets detailed type info about a given thing.
   *
   * @param {*} thing The thing to find the type info of
   *
   * @returns {Type} The Type info
   */
  of(thing) {
    return new Type(thing)
  },

  /**
   * Parses a string into a primitive type.
   *
   * @param {string} string The string to cast
   *
   * @returns {number|boolean|string} The string casted into a number or boolean
   */
  parsePrimitive(string) {
    return castIntoPrimitive(string);
  }
}
