import { a as _toConsumableArray, b as _objectWithoutProperties, c as _extends, d as _objectSpread } from './chunk-b6566c55.js';
import React from 'react';
import PropTypes from 'prop-types';
import { isFunction as isFn, createMarkup, cleanPath } from './utils.js';
import { Link } from './routing.js';

var propTypes = {
  // additional arguments to send to the render function.
  args: PropTypes.array,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.node
};
var defaultProps = {
  args: [],
  children: function children(v) {
    return v;
  },
  collapsible: true,
  tag: 'div',
  value: null
};

var ValueElement = function ValueElement(_ref) {
  var args = _ref.args,
      children = _ref.children,
      collapsible = _ref.collapsible,
      Tag = _ref.tag,
      value = _ref.value,
      attrs = _objectWithoutProperties(_ref, ["args", "children", "collapsible", "tag", "value"]);

  // Protect the child render function.
  var render = isFn(children) ? children : defaultProps.children; // Wrap the value with the element and return (if not collapsible).

  return !value && collapsible ? null : React.createElement(Tag, attrs, render.apply(void 0, [value].concat(_toConsumableArray(args))));
};

ValueElement.displayName = 'Core/Elements/Value';
ValueElement.propTypes = propTypes;
ValueElement.defaultProps = defaultProps;

var propTypes$1 = {
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.string
};
var defaultProps$1 = {
  collapsible: true,
  tag: 'div',
  value: ''
};

var HTMLElement = function HTMLElement(_ref) {
  var collapsible = _ref.collapsible,
      value = _ref.value,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["collapsible", "value", "tag"]);

  if (!value && collapsible) return null;
  return React.createElement(Tag, _extends({
    dangerouslySetInnerHTML: createMarkup(value)
  }, attrs));
};

HTMLElement.displayName = 'Core/Elements/HTML';
HTMLElement.propTypes = propTypes$1;
HTMLElement.defaultProps = defaultProps$1;

var propTypes$2 = {
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
var defaultProps$2 = {
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

  var child = asHTML ? React.createElement(HTMLElement, props) : React.createElement(ValueElement, props);
  if (isExternal) return child;
  return React.createElement(Link, {
    route: "/".concat(cleanPath(href)),
    params: params,
    passHref: true
  }, child);
};

LinkElement.displayName = 'Core/Elements/Link';
LinkElement.propTypes = propTypes$2;
LinkElement.defaultProps = defaultProps$2;

export { LinkElement as a, ValueElement as b, HTMLElement as c };
