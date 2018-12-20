'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-15d55d73.js');
var React = require('react');
var React__default = _interopDefault(React);
var utils = require('./utils.js');
var objectPath = require('object-path');
var PropTypes = _interopDefault(require('prop-types'));

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/core/Elements/Value.jsx";
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "collapsible", "context", "tag", "value"]);

  // Protect the child render function.
  var render = utils.isFunction(children) ? children : defaultProps.children; // Wrap the value with the element and return (if not collapsible).

  return !value && collapsible ? null : React__default.createElement(Tag, __chunk_1._extends({}, attrs, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }), render(value, context));
};

ValueElement.displayName = 'Core/Elements/Value';
ValueElement.propTypes = propTypes;
ValueElement.defaultProps = defaultProps;

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/components/core/Elements/HTML.jsx";
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["collapsible", "value", "tag"]);

  if (!value && collapsible) return null;
  return React__default.createElement(Tag, __chunk_1._extends({
    dangerouslySetInnerHTML: utils.createMarkup(value)
  }, attrs, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 24
    },
    __self: this
  }));
};

HTMLElement.displayName = 'Core/Elements/HTML';
HTMLElement.propTypes = propTypes$1;
HTMLElement.defaultProps = defaultProps$1;

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/components/core/Elements/Date.jsx";
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
      rest = __chunk_1._objectWithoutProperties(_ref, ["format", "value"]);

  // Format the date. Will return null on an invalid date value.
  var value = utils.formatDate(raw, format); // Create the `datetime` element attribute
  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time

  var dateTime = utils.formatDate(raw);
  return React__default.createElement(ValueElement, __chunk_1._extends({
    value: value,
    dateTime: dateTime
  }, rest, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 39
    },
    __self: this
  }));
};

DateElement.propTypes = 'Core/Elements/Date';
DateElement.propTypes = propTypes$2;
DateElement.defaultProps = defaultProps$2;

var _jsxFileName$3 = "/base-cms/packages/nextjs-web/src/components/core/Elements/ObjectValue.jsx";
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
      rest = __chunk_1._objectWithoutProperties(_ref, ["asDate", "asHTML", "obj", "dateFormat", "path"]);

  // Extract the value off the object.
  var value = objectPath.get(obj, path, null); // Return as a date, if applicable.

  if (asDate) return React__default.createElement(DateElement, __chunk_1._extends({
    format: dateFormat,
    value: value
  }, rest, {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 40
    },
    __self: this
  }));
  if (asHTML) return React__default.createElement(HTMLElement, __chunk_1._extends({
    value: value
  }, rest, {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 41
    },
    __self: this
  }));
  return React__default.createElement(ValueElement, __chunk_1._extends({
    value: value,
    context: {
      obj: obj,
      path: path
    }
  }, rest, {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 42
    },
    __self: this
  }));
};

ObjectValueElement.displayName = 'Core/Elements/ObjectValue';
ObjectValueElement.propTypes = propTypes$3;
ObjectValueElement.defaultProps = defaultProps$3;

exports.HTML = HTMLElement;
exports.Value = ValueElement;
exports.ObjectValue = ObjectValueElement;
exports.Date = DateElement;
