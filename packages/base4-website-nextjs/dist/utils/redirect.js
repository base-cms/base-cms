"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routes = require("../../routes");

/**
 * @param {?object} res The Express response object.
 * @param {string} route The route name (or href) to redirect to
 * @param {number} [code=301] The redirect response code.
 */
var _default = function _default(res, route) {
  var code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 301;

  if (res) {
    // Server-side only.
    res.writeHead(code, {
      Location: route
    });
    res.end();
  } else {
    // Client-side.
    _routes.Router.replaceRoute(route);
  }
};

exports.default = _default;