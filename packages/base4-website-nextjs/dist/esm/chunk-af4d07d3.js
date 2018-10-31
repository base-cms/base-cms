import { i as _objectWithoutProperties, j as _extends } from './chunk-1a4eb17c.js';
import React from 'react';
import PropTypes from 'prop-types';
import { isFunction as isFn, createMarkup, formatDate } from './utils.js';
import { get } from 'object-path';

var propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  // optional context object to send to children callback.
  context: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.node
};
var defaultProps = {
  children: function children(v) {
    return v;
  },
  collapsible: true,
  context: {},
  tag: 'span',
  value: null
};

var ValueElement = function ValueElement(_ref) {
  var children = _ref.children,
      collapsible = _ref.collapsible,
      context = _ref.context,
      Tag = _ref.tag,
      value = _ref.value,
      attrs = _objectWithoutProperties(_ref, ["children", "collapsible", "context", "tag", "value"]);

  // Protect the child render function.
  var render = isFn(children) ? children : defaultProps.children; // Wrap the value with the element and return (if not collapsible).

  return !value && collapsible ? null : React.createElement(Tag, attrs, render(value, context));
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
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  // optional context object to send to children callback.
  context: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  format: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, // Must adhere to moment date string reqs.
  PropTypes.objectOf(Date)])
};
var defaultProps$2 = {
  collapsible: true,
  children: undefined,
  context: {},
  format: 'MMM Do, YYYY',
  tag: 'time',
  value: null
};

var DateElement = function DateElement(_ref) {
  var format = _ref.format,
      raw = _ref.value,
      rest = _objectWithoutProperties(_ref, ["format", "value"]);

  // Format the date. Will return null on an invalid date value.
  var value = formatDate(raw, format); // Create the `datetime` element attribute
  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time

  var dateTime = formatDate(raw);
  return React.createElement(ValueElement, _extends({
    value: value,
    dateTime: dateTime
  }, rest));
};

DateElement.propTypes = 'Core/Elements/Date';
DateElement.propTypes = propTypes$2;
DateElement.defaultProps = defaultProps$2;

var propTypes$3 = {
  asDate: PropTypes.bool,
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  dateFormat: PropTypes.string,
  obj: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$3 = {
  asDate: false,
  asHTML: false,
  children: undefined,
  collapsible: true,
  dateFormat: 'MMM Do, YYYY',
  obj: {},
  tag: 'span'
};

var ObjectValueElement = function ObjectValueElement(_ref) {
  var asDate = _ref.asDate,
      asHTML = _ref.asHTML,
      obj = _ref.obj,
      dateFormat = _ref.dateFormat,
      path = _ref.path,
      rest = _objectWithoutProperties(_ref, ["asDate", "asHTML", "obj", "dateFormat", "path"]);

  // Extract the value off the object.
  var value = get(obj, path, null); // Return as a date, if applicable.

  if (asDate) return React.createElement(DateElement, _extends({
    format: dateFormat,
    value: value
  }, rest));
  if (asHTML) return React.createElement(HTMLElement, _extends({
    value: value
  }, rest));
  return React.createElement(ValueElement, _extends({
    value: value,
    context: {
      obj: obj,
      path: path
    }
  }, rest));
};

ObjectValueElement.displayName = 'Core/Elements/ObjectValue';
ObjectValueElement.propTypes = propTypes$3;
ObjectValueElement.defaultProps = defaultProps$3;

export { ValueElement as a, HTMLElement as b, ObjectValueElement as c, DateElement as d };
