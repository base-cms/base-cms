'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-9e05845b.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_2 = require('./chunk-418210bf.js');
require('./utils.js');
require('inflected');
require('moment');
require('object-path');
require('./routing.js');
require('./chunk-4b678d5c.js');

var propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  format: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, // Must adhere to moment date string reqs.
  PropTypes.objectOf(Date)]))
};
var defaultProps = {
  children: undefined,
  collapsible: true,
  format: 'MMM Do, YYYY',
  tag: 'time',
  values: []
};

var DateCollection = function DateCollection(_ref) {
  var values = _ref.values,
      rest = __chunk_1._objectWithoutProperties(_ref, ["values"]);

  var arr = Array.isArray(values) ? values : [];
  return React__default.createElement(React__default.Fragment, null, arr.map(function (value, index) {
    return React__default.createElement(__chunk_2.DateElement, __chunk_1._extends({
      key: index,
      value: value
    }, rest));
  }));
};

DateCollection.displayName = 'Core/Collections/Date';
DateCollection.propTypes = propTypes;
DateCollection.defaultProps = defaultProps;

var propTypes$1 = {
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  values: PropTypes.arrayOf(PropTypes.string)
};
var defaultProps$1 = {
  collapsible: true,
  tag: 'span',
  values: []
};

var HTMLCollection = function HTMLCollection(_ref) {
  var values = _ref.values,
      rest = __chunk_1._objectWithoutProperties(_ref, ["values"]);

  var arr = Array.isArray(values) ? values : [];
  return React__default.createElement(React__default.Fragment, null, arr.map(function (value, index) {
    return React__default.createElement(__chunk_2.HTML, __chunk_1._extends({
      key: index,
      value: value
    }, rest));
  }));
};

HTMLCollection.displayName = 'Core/Collections/HTML';
HTMLCollection.propTypes = propTypes$1;
HTMLCollection.defaultProps = defaultProps$1;

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
    return React__default.createElement(__chunk_2.ObjectValue, __chunk_1._extends({
      key: index,
      obj: obj
    }, rest));
  }));
};

ObjectValueCollection.displayName = 'Core/Collections/ObjectValue';
ObjectValueCollection.propTypes = propTypes$2;
ObjectValueCollection.defaultProps = defaultProps$2;

var propTypes$3 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  values: PropTypes.arrayOf(PropTypes.node)
};
var defaultProps$3 = {
  children: undefined,
  collapsible: true,
  tag: 'span',
  values: []
};

var ValueCollection = function ValueCollection(_ref) {
  var values = _ref.values,
      rest = __chunk_1._objectWithoutProperties(_ref, ["values"]);

  var arr = Array.isArray(values) ? values : [];
  return React__default.createElement(React__default.Fragment, null, arr.map(function (value, index) {
    return React__default.createElement(__chunk_2.Value, __chunk_1._extends({
      key: index,
      value: value
    }, rest));
  }));
};

ValueCollection.displayName = 'Core/Collections/Value';
ValueCollection.propTypes = propTypes$3;
ValueCollection.defaultProps = defaultProps$3;

exports.DateElement = __chunk_2.DateElement;
exports.HTMLElement = __chunk_2.HTML;
exports.LinkElement = __chunk_2.LinkElement;
exports.ObjectValueElement = __chunk_2.ObjectValue;
exports.ValueElement = __chunk_2.Value;
exports.DateCollection = DateCollection;
exports.HTMLCollection = HTMLCollection;
exports.ObjectValueCollection = ObjectValueCollection;
exports.ValueCollection = ValueCollection;
