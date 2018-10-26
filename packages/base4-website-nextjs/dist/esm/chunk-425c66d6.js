import { a as _extends, b as _objectWithoutProperties } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import { a as HTMLElement, b as Element } from './chunk-742fd19b.js';
import { formatDate } from './utils.js';

var propTypes = {
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  data: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps = {
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

FieldValue.propTypes = propTypes;
FieldValue.defaultProps = defaultProps;

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

export { FieldValue as a, FormatDate as b };
