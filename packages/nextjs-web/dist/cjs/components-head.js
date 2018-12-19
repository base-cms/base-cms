'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./chunk-cd896063.js');
var React = require('react');
var React__default = _interopDefault(React);
var utils = require('./utils.js');
require('object-path');
var PropTypes = _interopDefault(require('prop-types'));
var Head = _interopDefault(require('next/head'));

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/head/MetaDescription.jsx";

var MetaDescription = function MetaDescription(_ref) {
  var value = _ref.value;
  if (!value) return null;
  return React__default.createElement(Head, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, React__default.createElement("meta", {
    name: "description",
    content: value,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }));
};

MetaDescription.propTypes = {
  value: PropTypes.string
};
MetaDescription.defaultProps = {
  value: null
};

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/components/head/PageTitle.jsx";
var propTypes = {
  children: PropTypes.func,
  concateWith: PropTypes.string,
  siteName: PropTypes.string,
  value: PropTypes.string.isRequired
};
var defaultProps = {
  children: undefined,
  concateWith: '|',
  siteName: null
};

var PageTitle = function PageTitle(_ref) {
  var render = _ref.children,
      concateWith = _ref.concateWith,
      siteName = _ref.siteName,
      value = _ref.value;
  var title = siteName ? "".concat(value, " ").concat(concateWith, " ").concat(siteName) : value;
  return React__default.createElement(Head, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 27
    },
    __self: this
  }, React__default.createElement("title", {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 28
    },
    __self: this
  }, utils.isFunction(render) ? render() : title));
};

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/components/head/RelCanonical.jsx";

var RelCanonical = function RelCanonical(_ref) {
  var origin = _ref.origin,
      pathname = _ref.pathname;
  return React__default.createElement(Head, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 8
    },
    __self: this
  }, React__default.createElement("link", {
    rel: "canonical",
    href: "".concat(origin, "/").concat(utils.cleanPath(pathname)),
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 9
    },
    __self: this
  }));
};

RelCanonical.propTypes = {
  pathname: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired
};

exports.MetaDescription = MetaDescription;
exports.PageTitle = PageTitle;
exports.RelCanonical = RelCanonical;
