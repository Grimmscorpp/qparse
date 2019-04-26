function parseQuery(input) {
  var query = {};
  var search = "";

  var isDefined = function (content) {
    return content !== null && content !== undefined;
  };

  var percentEncode = function (content) {
    return isDefined(content) ? encodeURIComponent(content) : "";
  };

  var percentDecode = function (content) {
    return isDefined(content) ? decodeURIComponent(content) : "";
  };

  if (!isDefined(input)) {
    search = window.location.search;

  } else if (typeof input === "string") {
    var qIndex = input.indexOf("?");
    var hIndex = input.indexOf("#");

    if (qIndex >= 0) {
      search = input.substring(qIndex, hIndex > qIndex ? hIndex : input.length);
      if (search.trim() === "?") {
        search = "";
      }
    }
  }

  var parsed = {};

  if (search) {
    var params = search.substring(1).split("&");

    for (var i in params) {
      var param = params[i];
      var eqIndex = param.indexOf("=");

      var name = "";
      var value = "";

      if (eqIndex >= 0) {
        name = percentDecode(param.substring(0, eqIndex));
        value = percentDecode(param.substring(eqIndex + 1));

      } else {
        name = percentDecode(param);
      }

      if (!parsed[name]) {
        parsed[name] = value;

      } else if (!Array.isArray(parsed[name])) {
        parsed[name] = [parsed[name], value];

      } else {
        parsed[name].push(value);
      }
    }
  }

  query.parsed = parsed;

  Object.defineProperty(query, "isEmpty", {
    get: function () {
      return Object.keys(this.parsed).length === 0;
    }
  });

  query.toString = function () {
    var params = [];

    for (var prop in this.parsed) {
      var name = percentEncode(prop);
      var content = this.parsed[prop];

      if (!Array.isArray(content)) {
        var value = content;
        params.push(name + "=" + percentEncode(value));

      } else for (var i in content) {
        var value = content[i];
        params.push(name + "=" + percentEncode(value));
      }
    }

    return params.length ? "?" + params.join("&") : "";
  };

  return query;
}
