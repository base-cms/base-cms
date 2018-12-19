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
var routing = require('./routing.js');
var classNames = _interopDefault(require('classnames'));
var router = require('next/router');

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/core/Elements/Link.jsx";
var propTypes = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  // Route name or URL to match (per `next-routes`).
  to: PropTypes.string.isRequired,
  // The inner value to render by default.
  value: PropTypes.node
};
var defaultProps = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  params: undefined,
  value: null
};

var LinkElement = function LinkElement(_ref) {
  var asHTML = _ref.asHTML,
      children = _ref.children,
      collapsible = _ref.collapsible,
      params = _ref.params,
      to = _ref.to,
      value = _ref.value,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["asHTML", "children", "collapsible", "params", "to", "value"]);

  var href = String(to || '');
  var isExternal = href.match(/^(http:|https:|ftp:|mailto:|\/\/)/i);

  var props = __chunk_1._objectSpread({}, attrs, {
    children: children,
    collapsible: collapsible,
    href: isExternal ? href : undefined,
    tag: 'a',
    value: value
  });

  var child = asHTML ? React__default.createElement(__chunk_5.HTML, __chunk_1._extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  })) : React__default.createElement(__chunk_5.Value, __chunk_1._extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }));
  if (isExternal) return child;
  return React__default.createElement(routing.Link, {
    route: "/".concat(utils.cleanPath(href)),
    params: params,
    passHref: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, child);
};

LinkElement.displayName = 'Core/Elements/Link';
LinkElement.propTypes = propTypes;
LinkElement.defaultProps = defaultProps;

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/components/core/PlaceholderAd.jsx";
var propTypes$1 = {
  className: PropTypes.string,
  size: PropTypes.string.isRequired
};
var defaultProps$1 = {
  className: null
};

var PlaceholderAd = function PlaceholderAd(_ref) {
  var className = _ref.className,
      size = _ref.size;
  return React__default.createElement("div", {
    className: classNames('text-center', className),
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 15
    },
    __self: this
  }, React__default.createElement("img", {
    src: "https://dummyimage.com/".concat(size, "/ccc/000"),
    alt: "".concat(size, " Advertisement"),
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 16
    },
    __self: this
  }));
};

PlaceholderAd.propTypes = propTypes$1;
PlaceholderAd.defaultProps = defaultProps$1;

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/components/core/Navigation/Wrapper.jsx";
var propTypes$2 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  router: PropTypes.object.isRequired,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$2 = {
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
      fileName: _jsxFileName$2,
      lineNumber: 24
    },
    __self: this
  }), children);
};

Wrapper.displayName = 'Core/Navigation/Wrapper';
Wrapper.propTypes = propTypes$2;
Wrapper.defaultProps = defaultProps$2;
var Wrapper$1 = router.withRouter(Wrapper);

exports.DateElement = __chunk_5.Date;
exports.HTMLElement = __chunk_5.HTML;
exports.ObjectValueElement = __chunk_5.ObjectValue;
exports.ValueElement = __chunk_5.Value;
exports.LinkElement = LinkElement;
exports.NavigationWrapper = Wrapper$1;
exports.PlaceholderAd = PlaceholderAd;
