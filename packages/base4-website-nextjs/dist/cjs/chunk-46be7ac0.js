'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var utils = require('./utils.js');
var objectPath = require('object-path');
var routing = require('./routing.js');

var propTypes = {
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.string
};
var defaultProps = {
  collapsible: true,
  tag: 'div',
  value: ''
};

var HTMLElement = function HTMLElement(_ref) {
  var collapsible = _ref.collapsible,
      value = _ref.value,
      Tag = _ref.tag,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["collapsible", "value", "tag"]);

  if (!value && collapsible) return null;
  return React__default.createElement(Tag, __chunk_1._extends({
    dangerouslySetInnerHTML: utils.createMarkup(value)
  }, attrs));
};

HTMLElement.propTypes = propTypes;
HTMLElement.defaultProps = defaultProps;

var propTypes$1 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.node
};
var defaultProps$1 = {
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "collapsible", "tag", "value"]);

  // Protect the child render function.
  var render = utils.isFunction(children) ? children : defaultProps$1.children; // Wrap the value with the element and return (if not collapsible).

  return !value && collapsible ? null : React__default.createElement(Tag, attrs, render(value));
};

Element.propTypes = propTypes$1;
Element.defaultProps = defaultProps$1;

var propTypes$2 = {
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  data: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$2 = {
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
      rest = __chunk_1._objectWithoutProperties(_ref, ["asHTML", "data", "path"]);

  // Extract the value off the data object.
  var value = objectPath.get(data, path, null); // Return as either an innerHTML or regular element.

  return asHTML ? React__default.createElement(HTMLElement, __chunk_1._extends({
    value: value
  }, rest)) : React__default.createElement(Element, __chunk_1._extends({
    value: value
  }, rest));
};

FieldValue.propTypes = propTypes$2;
FieldValue.defaultProps = defaultProps$2;

var propTypes$3 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, // Must adhere to moment date string reqs.
  PropTypes.objectOf(Date)]),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$3 = {
  collapsible: true,
  children: undefined,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null
};

var FormatDate = function FormatDate(_ref) {
  var format = _ref.format,
      raw = _ref.value,
      rest = __chunk_1._objectWithoutProperties(_ref, ["format", "value"]);

  // Format the date. Will return null on an invalid date value.
  var value = utils.formatDate(raw, format);
  return React__default.createElement(Element, __chunk_1._extends({
    value: value
  }, rest));
};

FormatDate.propTypes = propTypes$3;
FormatDate.defaultProps = defaultProps$3;

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

  var child = asHTML ? React__default.createElement(HTMLElement, props) : React__default.createElement(Element, props);
  if (isExternal) return child;
  return React__default.createElement(routing.Link, {
    route: "/".concat(utils.cleanPath(href)),
    params: params,
    passHref: true
  }, child);
};

LinkElement.propTypes = propTypes$4;
LinkElement.defaultProps = defaultProps$4;

exports.FieldValue = FieldValue;
exports.FormatDate = FormatDate;
exports.LinkElement = LinkElement;
exports.Element = Element;
exports.HTMLElement = HTMLElement;
