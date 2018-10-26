import { b as _extends, a as _objectWithoutProperties } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import { b as Value, c as HTML } from './chunk-0ccd7852.js';
import { formatDate } from './utils.js';
import { get } from 'object-path';

var propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, // Must adhere to moment date string reqs.
  PropTypes.objectOf(Date)]),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps = {
  collapsible: true,
  children: undefined,
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
  return React.createElement(Value, _extends({
    value: value,
    dateTime: dateTime
  }, rest));
};

DateElement.propTypes = 'Core/Elements/Date';
DateElement.propTypes = propTypes;
DateElement.defaultProps = defaultProps;

var propTypes$1 = {
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
var defaultProps$1 = {
  asDate: false,
  asHTML: false,
  children: undefined,
  collapsible: true,
  dateFormat: 'MMM Do, YYYY',
  obj: {},
  tag: 'div'
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
  }, rest)); // Return as either an innerHTML or regular element.

  return asHTML ? React.createElement(HTML, _extends({
    value: value
  }, rest)) : React.createElement(Value, _extends({
    value: value
  }, rest));
};

ObjectValueElement.displayName = 'Core/Elements/ObjectValue';
ObjectValueElement.propTypes = propTypes$1;
ObjectValueElement.defaultProps = defaultProps$1;

export { ObjectValueElement as a, DateElement as b };
