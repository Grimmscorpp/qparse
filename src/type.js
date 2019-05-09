class Type {
  constructor(thing) {
    switch (typeof thing) {
      case "string":
        var isString = true;
        break;
      case "number":
        var isNumber = true;
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

module.exports = {
  of(thing) {
    return new Type(thing)
  }
}
