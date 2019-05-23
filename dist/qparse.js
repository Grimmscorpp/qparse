/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Query = __webpack_require__(1);

var type = __webpack_require__(3);

var qparse = {
  /**
   * Returns a new object representing a query string.
   *
   * @param {*} [data] An optional data representing the query string parameters
   * @returns {Query} An object representing the query
   */
  create: function create(data) {
    var query = new Query();

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
  parse: function parse(url) {
    var parsePrimitives = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (!type.of(url).isString) return new Query();
    return new Query(url, parsePrimitives && true || false);
  }
};

if (typeof window !== "undefined") {
  window.qparse = qparse;
  window.qp = qparse;
}

module.exports = qparse;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var percent = __webpack_require__(2);

var type = __webpack_require__(3);
/**
 * Represents a query string.
 */


var Query =
/*#__PURE__*/
function () {
  /**
   * Creates a new object representing a query string.
   *
   * @param {string} [queryString=""] An optional query string to objectify
   * @param {boolean} [parsePrimitives=true] When ommitted or set to `true`, attemps to parse primitive types from the supplied query string
   */
  function Query() {
    var queryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var parsePrimitives = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Query);

    /**
     * Encapsulates the query string parameters.
     */
    this.data = queryString === "" ? {} : deserialize(queryString, parsePrimitives);
  }
  /**
   * Returns `true` if the query does not have parameters.
   */


  _createClass(Query, [{
    key: "has",

    /**
     * Returns `true` if the query contains the specified key.
     *
     * @param {string} key The key to check if exists
     */
    value: function has(key) {
      if (!this.data) return false;
      return this.data[key] !== undefined;
    }
    /**
     * Returns the query string.
     */

  }, {
    key: "toString",
    value: function toString() {
      if (isEmpty(this.data)) return "";
      return "?" + serialize(this.data);
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return isEmpty(this.data);
    }
  }]);

  return Query;
}();

function isEmpty(data) {
  if (!data) return true;

  for (var prop in data) {
    if (data[prop] !== undefined) return false;
  }

  return true;
}

function serialize(object) {
  var nestingPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var params = [];

  for (var prop in object) {
    var content = object[prop];
    if (content === undefined) continue;
    var name = nestingPrefix ? nestingPrefix + "." + prop : prop;
    var contentType = type.of(content);

    if (contentType.isObject) {
      params.push(serialize(content, name));
    } else if (!contentType.isArray) {
      addParamTo(params, name, content);
    } else {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = content[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          addParamTo(params, name, item);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  return params.join("&");
}

function addParamTo(array, name, value) {
  var param = percent.encode(name);

  if (value !== null) {
    if (type.of(value).isString) {
      value = percent.encode(value);
    }

    param += "=" + value;
  }

  array.push(param);
}

function deserialize(url) {
  var parsePrimitives = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var data = {};
  var nestedNameDetector = /^[_a-z]\w*(?:\.[_a-z]\w*)+$/i;
  var nestedParams = [];
  parseQueryStringParametersFrom(url, function (name, value) {
    if (nestedNameDetector.exec(name)) {
      nestedParams.push({
        name: name,
        value: value
      });
    } else {
      addPropTo(data, name, value, parsePrimitives);
    }
  });

  if (nestedParams.length !== 0) {
    nestedParams.sort(function (one, other) {
      return one.name.localeCompare(other.name);
    });

    for (var _i = 0, _nestedParams = nestedParams; _i < _nestedParams.length; _i++) {
      var param = _nestedParams[_i];
      var ptr = data;
      var components = param.name.split(".");
      var prop = components.pop();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = components[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var comp = _step2.value;

          if (!ptr.hasOwnProperty(comp)) {
            ptr[comp] = {};
          } else if (!type.of(ptr[comp]).isObject) {
            ptr = data;
            prop = param.name;
            break;
          }

          ptr = ptr[comp];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      addPropTo(ptr, prop, param.value, parsePrimitives);
    }
  }

  return data;
}

function parseQueryStringParametersFrom(url, onParameterParsed) {
  var qIndex = url.indexOf("?");
  if (qIndex < 0) return;
  var paramFinder = /[&?](([^=&#]*)(=?)([^&#]*))(#?)/g;
  paramFinder.lastIndex = qIndex;

  for (var found = null; found = paramFinder.exec(url);) {
    var param = found[1];
    var containsEquals = found[3] === "=";
    var terminatedByHash = found[5] === "#";
    var name = percent.decode(found[2]);
    var value = containsEquals ? percent.decode(found[4]) : null;
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Percent encodes a given string.
 * @param {string} string The string to encode
 */
function encode(string) {
  try {
    return encodeURIComponent(string);
  } catch (e) {
    return string;
  }
}
/**
 * Percent decodes a given string.
 * @param {string} string The string to decode
 */


function decode(string) {
  try {
    return decodeURIComponent(string);
  } catch (e) {
    return string;
  }
}

module.exports = {
  encode: encode,
  decode: decode
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Type = function Type(thing) {
  _classCallCheck(this, Type);

  switch (_typeof(thing)) {
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
};

function castIntoPrimitive(thing) {
  var normalizedValue = thing;
  var number = Number.parseFloat(thing);

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
  of: function of(thing) {
    return new Type(thing);
  },

  /**
   * Parses a string into a primitive type.
   *
   * @param {string} string The string to cast
   *
   * @returns {number|boolean|string} The string casted into a number or boolean
   */
  parsePrimitive: function parsePrimitive(string) {
    return castIntoPrimitive(string);
  }
};

/***/ })
/******/ ]);