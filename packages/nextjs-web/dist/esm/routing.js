import { f as _extends } from './chunk-cc870ac4.js';
import React from 'react';
import { a as RoutingContext } from './chunk-fccae6e7.js';
export { a as RoutingContext } from './chunk-fccae6e7.js';

var _jsxFileName = "/base-cms/packages/nextjs-web/src/routing/Link.jsx";
var Link = (function (props) {
  return React.createElement(RoutingContext.Consumer, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, function (_ref) {
    var NextLink = _ref.Link;
    return React.createElement(NextLink, _extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      },
      __self: this
    }));
  });
});

var redirect = function redirect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      Router = _ref.Router,
      res = _ref.res,
      route = _ref.route,
      _ref$code = _ref.code,
      code = _ref$code === void 0 ? 301 : _ref$code;

  if (res) {
    // Server-side.
    res.writeHead(code, {
      Location: route
    });
    res.end();
  } else if (Router) {
    // Client-side.
    Router.replaceRoute(route);
  }
};

export { Link, redirect };
