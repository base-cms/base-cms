import { a as _objectWithoutProperties, b as _extends, c as _objectSpread } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import { isFunction as isFn, formatDate, createMarkup, cleanPath } from './utils.js';
import { get } from 'object-path';
import { Link } from './routing.js';

var propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.node
};
var defaultProps = {
  children: function children(v) {
    return v;
  },
  collapsible: true,
  tag: 'div',
  value: null
};

var Element = function Element(_ref) {
  var children = _ref.children,
      collapsible = _ref.collapsible,
      Tag = _ref.tag,
      value = _ref.value,
      attrs = _objectWithoutProperties(_ref, ["children", "collapsible", "tag", "value"]);

  // Protect the child render function.
  var render = isFn(children) ? children : defaultProps.children; // Wrap the value with the element and return (if not collapsible).

  return !value && collapsible ? null : React.createElement(Tag, attrs, render(value));
};

Element.propTypes = propTypes;
Element.defaultProps = defaultProps;

var propTypes$1 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, // Must adhere to moment date string reqs.
  PropTypes.objectOf(Date)]),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$1 = {
  collapsible: true,
  children: undefined,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null
};

var FormatDate = function FormatDate(_ref) {
  var format = _ref.format,
      raw = _ref.value,
      rest = _objectWithoutProperties(_ref, ["format", "value"]);

  // Format the date. Will return null on an invalid date value.
  var value = formatDate(raw, format);
  return React.createElement(Element, _extends({
    value: value
  }, rest));
};

FormatDate.propTypes = propTypes$1;
FormatDate.defaultProps = defaultProps$1;

var propTypes$2 = {
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.string
};
var defaultProps$2 = {
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

HTMLElement.propTypes = propTypes$2;
HTMLElement.defaultProps = defaultProps$2;

var propTypes$3 = {
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  data: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$3 = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  data: {},
  tag: 'div'
};

var FieldValue = function FieldValue(_ref) {
  var asHTML = _ref.asHTML,
      data = _ref.data,
      path = _ref.path,
      rest = _objectWithoutProperties(_ref, ["asHTML", "data", "path"]);

  // Extract the value off the data object.
  var value = get(data, path, null); // Return as either an innerHTML or regular element.

  return asHTML ? React.createElement(HTMLElement, _extends({
    value: value
  }, rest)) : React.createElement(Element, _extends({
    value: value
  }, rest));
};

FieldValue.propTypes = propTypes$3;
FieldValue.defaultProps = defaultProps$3;

var propTypes$4 = {
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
var defaultProps$4 = {
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

  var child = asHTML ? React.createElement(HTMLElement, props) : React.createElement(Element, props);
  if (isExternal) return child;
  return React.createElement(Link, {
    route: "/".concat(cleanPath(href)),
    params: params,
    passHref: true
  }, child);
};

LinkElement.propTypes = propTypes$4;
LinkElement.defaultProps = defaultProps$4;

export { FormatDate as a, FieldValue as b, LinkElement as c, Element as d, HTMLElement as e };
