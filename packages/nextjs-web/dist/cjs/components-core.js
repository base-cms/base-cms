'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-15d55d73.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./chunk-d1518d46.js');
var utils = require('./utils.js');
require('inflected');
require('escape-string-regexp');
require('moment');
require('object-path');
require('next/config');
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_5 = require('./chunk-6bc6a447.js');
require('./routing.js');
var __chunk_6 = require('./chunk-0f8734d1.js');
var classNames = _interopDefault(require('classnames'));
var router = require('next/router');

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/core/PlaceholderAd.jsx";
var propTypes = {
  className: PropTypes.string,
  size: PropTypes.string.isRequired
};
var defaultProps = {
  className: null
};

var PlaceholderAd = function PlaceholderAd(_ref) {
  var className = _ref.className,
      size = _ref.size;
  return React__default.createElement("div", {
    className: classNames('text-center', className),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, React__default.createElement("img", {
    src: "https://dummyimage.com/".concat(size, "/ccc/000"),
    alt: "".concat(size, " Advertisement"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }));
};

PlaceholderAd.propTypes = propTypes;
PlaceholderAd.defaultProps = defaultProps;

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/components/core/Navigation/Wrapper.jsx";
var propTypes$1 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  router: PropTypes.object.isRequired,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$1 = {
  tag: 'nav'
};

var Wrapper = function Wrapper(_ref) {
  var children = _ref.children,
      router$$1 = _ref.router,
      Tag = _ref.tag,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "router", "tag"]);

  var asPath = router$$1.asPath,
      route = router$$1.route;
  return React__default.createElement(Tag, __chunk_1._extends({
    "data-route": utils.cleanPath(route),
    "data-path": utils.cleanPath(asPath)
  }, attrs, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 24
    },
    __self: this
  }), children);
};

Wrapper.displayName = 'Core/Navigation/Wrapper';
Wrapper.propTypes = propTypes$1;
Wrapper.defaultProps = defaultProps$1;
var Wrapper$1 = router.withRouter(Wrapper);

exports.DateElement = __chunk_5.Date;
exports.HTMLElement = __chunk_5.HTML;
exports.ObjectValueElement = __chunk_5.ObjectValue;
exports.ValueElement = __chunk_5.Value;
exports.LinkElement = __chunk_6.LinkElement;
exports.NavigationWrapper = Wrapper$1;
exports.PlaceholderAd = PlaceholderAd;
