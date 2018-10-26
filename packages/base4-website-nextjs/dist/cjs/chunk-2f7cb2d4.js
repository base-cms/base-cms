'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var objectPath = require('object-path');
var __chunk_2 = require('./chunk-5dc5312d.js');
var utils = require('./utils.js');

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
      rest = __chunk_1._objectWithoutProperties(_ref, ["asHTML", "data", "path"]);

  // Extract the value off the data object.
  var value = objectPath.get(data, path, null); // Return as either an innerHTML or regular element.

  return asHTML ? React__default.createElement(__chunk_2.HTMLElement, __chunk_1._extends({
    value: value
  }, rest)) : React__default.createElement(__chunk_2.Element, __chunk_1._extends({
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
      rest = __chunk_1._objectWithoutProperties(_ref, ["format", "value"]);

  // Format the date. Will return null on an invalid date value.
  var value = utils.formatDate(raw, format);
  return React__default.createElement(__chunk_2.Element, __chunk_1._extends({
    value: value
  }, rest));
};

FormatDate.propTypes = propTypes$1;
FormatDate.defaultProps = defaultProps$1;

exports.FieldValue = FieldValue;
exports.FormatDate = FormatDate;
