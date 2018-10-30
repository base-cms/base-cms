import { f as _objectSpread, i as _objectWithoutProperties } from './chunk-1a4eb17c.js';
import React from 'react';
import PropTypes from 'prop-types';
import { a as Value, b as HTML } from './chunk-fccae53b.js';
import { Link } from './routing.js';
import { cleanPath } from './utils.js';

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

  var child = asHTML ? React.createElement(HTML, props) : React.createElement(Value, props);
  if (isExternal) return child;
  return React.createElement(Link, {
    route: "/".concat(cleanPath(href)),
    params: params,
    passHref: true
  }, child);
};

LinkElement.displayName = 'Core/Elements/Link';
LinkElement.propTypes = propTypes;
LinkElement.defaultProps = defaultProps;

export { LinkElement as a };
