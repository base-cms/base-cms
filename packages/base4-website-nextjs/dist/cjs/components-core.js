'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-ef1c5e57.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_4 = require('./chunk-dfcac77a.js');
var __chunk_2 = require('./chunk-d64f6f34.js');
require('./utils.js');
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
    return React__default.createElement(__chunk_4.DateElement, __chunk_1._extends({
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
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  values: PropTypes.arrayOf(PropTypes.node)
};
var defaultProps$2 = {
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
ValueCollection.propTypes = propTypes$2;
ValueCollection.defaultProps = defaultProps$2;

exports.DateElement = __chunk_4.DateElement;
exports.ObjectValueElement = __chunk_4.ObjectValue;
exports.ObjectValueCollection = __chunk_4.ObjectValueCollection;
exports.HTMLElement = __chunk_2.HTML;
exports.LinkElement = __chunk_2.LinkElement;
exports.ValueElement = __chunk_2.Value;
exports.DateCollection = DateCollection;
exports.HTMLCollection = HTMLCollection;
exports.ValueCollection = ValueCollection;
