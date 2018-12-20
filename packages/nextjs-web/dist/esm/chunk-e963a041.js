import { j as _objectWithoutProperties, h as _objectSpread, f as _extends } from './chunk-cc870ac4.js';
import React from 'react';
import { cleanPath } from './utils.js';
import PropTypes from 'prop-types';
import { a as HTML, b as Value } from './chunk-559b4f38.js';
import { Link } from './routing.js';

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

export { LinkElement as a };
