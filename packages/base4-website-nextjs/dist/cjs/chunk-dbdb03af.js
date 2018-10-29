'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-ef1c5e57.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_2 = require('./chunk-f20cadca.js');
var utils = require('./utils.js');
var objectPath = require('object-path');

var propTypes = {
  // additional arguments to send to the render function.
  args: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  format: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, // Must adhere to moment date string reqs.
  PropTypes.objectOf(Date)])
};
var defaultProps = {
  args: [],
  collapsible: true,
  children: undefined,
  format: 'MMM Do, YYYY',
  tag: 'time',
  value: null
};

var DateElement = function DateElement(_ref) {
  var args = _ref.args,
      format = _ref.format,
      raw = _ref.value,
      rest = __chunk_1._objectWithoutProperties(_ref, ["args", "format", "value"]);

  // Format the date. Will return null on an invalid date value.
  var value = utils.formatDate(raw, format); // Create the `datetime` element attribute
  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time

  var dateTime = utils.formatDate(raw);
  return React__default.createElement(__chunk_2.Value, __chunk_1._extends({
    value: value,
    dateTime: dateTime,
    args: args
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
      rest = __chunk_1._objectWithoutProperties(_ref, ["asDate", "asHTML", "obj", "dateFormat", "path"]);

  // Extract the value off the object.
  var value = objectPath.get(obj, path, null); // Return as a date, if applicable.

  if (asDate) return React__default.createElement(DateElement, __chunk_1._extends({
    format: dateFormat,
    value: value
  }, rest));
  if (asHTML) return React__default.createElement(__chunk_2.HTML, __chunk_1._extends({
    value: value
  }, rest));
  return React__default.createElement(__chunk_2.Value, __chunk_1._extends({
    value: value,
    args: [obj, path]
  }, rest));
};

ObjectValueElement.displayName = 'Core/Elements/ObjectValue';
ObjectValueElement.propTypes = propTypes$1;
ObjectValueElement.defaultProps = defaultProps$1;

var propTypes$2 = {
  asDate: PropTypes.bool,
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  dateFormat: PropTypes.string,
  objs: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$2 = {
  asDate: false,
  asHTML: false,
  children: undefined,
  collapsible: true,
  dateFormat: 'MMM Do, YYYY',
  objs: [],
  tag: 'span'
};

var ObjectValueCollection = function ObjectValueCollection(_ref) {
  var objs = _ref.objs,
      rest = __chunk_1._objectWithoutProperties(_ref, ["objs"]);

  var arr = Array.isArray(objs) ? objs : [];
  return React__default.createElement(React__default.Fragment, null, arr.map(function (obj, index) {
    return React__default.createElement(ObjectValueElement, __chunk_1._extends({
      key: Symbol(index),
      obj: obj
    }, rest));
  }));
};

ObjectValueCollection.displayName = 'Core/Collections/ObjectValue';
ObjectValueCollection.propTypes = propTypes$2;
ObjectValueCollection.defaultProps = defaultProps$2;

exports.ObjectValue = ObjectValueElement;
exports.ObjectValueCollection = ObjectValueCollection;
exports.DateElement = DateElement;
