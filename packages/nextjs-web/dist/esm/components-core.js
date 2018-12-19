import { j as _objectWithoutProperties, h as _objectSpread, f as _extends } from './chunk-cc870ac4.js';
import React from 'react';
import './chunk-fccae6e7.js';
import { cleanPath } from './utils.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';
import PropTypes from 'prop-types';
import { a as HTML, b as Value } from './chunk-e4c58053.js';
export { d as DateElement, a as HTMLElement, c as ObjectValueElement, b as ValueElement } from './chunk-e4c58053.js';
import { Link } from './routing.js';
import classNames from 'classnames';
import { withRouter } from 'next/router';

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
      attrs = _objectWithoutProperties(_ref, ["asHTML", "children", "collapsible", "params", "to", "value"]);

  var href = String(to || '');
  var isExternal = href.match(/^(http:|https:|ftp:|mailto:|\/\/)/i);

  var props = _objectSpread({}, attrs, {
    children: children,
    collapsible: collapsible,
    href: isExternal ? href : undefined,
    tag: 'a',
    value: value
  });

  var child = asHTML ? React.createElement(HTML, _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  })) : React.createElement(Value, _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }));
  if (isExternal) return child;
  return React.createElement(Link, {
    route: "/".concat(cleanPath(href)),
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
  return React.createElement("div", {
    className: classNames('text-center', className),
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 15
    },
    __self: this
  }, React.createElement("img", {
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
      router = _ref.router,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["children", "router", "tag"]);

  var asPath = router.asPath,
      route = router.route;
  return React.createElement(Tag, _extends({
    "data-route": cleanPath(route),
    "data-path": cleanPath(asPath)
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
var Wrapper$1 = withRouter(Wrapper);

export { LinkElement, Wrapper$1 as NavigationWrapper, PlaceholderAd };
