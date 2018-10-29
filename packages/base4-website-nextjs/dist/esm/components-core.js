import { c as _extends, b as _objectWithoutProperties } from './chunk-b6566c55.js';
import React from 'react';
import PropTypes from 'prop-types';
import { c as DateElement, a as ObjectValue, b as ObjectValueCollection } from './chunk-64c6200f.js';
export { c as DateElement, a as ObjectValueElement, b as ObjectValueCollection } from './chunk-64c6200f.js';
import { c as HTML, b as Value, a as LinkElement } from './chunk-0f5b0a48.js';
export { c as HTMLElement, a as LinkElement, b as ValueElement } from './chunk-0f5b0a48.js';
import './utils.js';
import 'moment';
import 'object-path';
import './routing.js';
import './chunk-7976a9a0.js';

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
      rest = _objectWithoutProperties(_ref, ["values"]);

  var arr = Array.isArray(values) ? values : [];
  return React.createElement(React.Fragment, null, arr.map(function (value, index) {
    return React.createElement(DateElement, _extends({
      key: Symbol(index),
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
      rest = _objectWithoutProperties(_ref, ["values"]);

  var arr = Array.isArray(values) ? values : [];
  return React.createElement(React.Fragment, null, arr.map(function (value, index) {
    return React.createElement(HTML, _extends({
      key: Symbol(index),
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
      rest = _objectWithoutProperties(_ref, ["values"]);

  var arr = Array.isArray(values) ? values : [];
  return React.createElement(React.Fragment, null, arr.map(function (value, index) {
    return React.createElement(Value, _extends({
      key: Symbol(index),
      value: value
    }, rest));
  }));
};

ValueCollection.displayName = 'Core/Collections/Value';
ValueCollection.propTypes = propTypes$2;
ValueCollection.defaultProps = defaultProps$2;

export { DateCollection, HTMLCollection, ValueCollection };
