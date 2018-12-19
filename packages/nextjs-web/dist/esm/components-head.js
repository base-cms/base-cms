import './chunk-cc870ac4.js';
import React from 'react';
import { isFunction as isFn, cleanPath } from './utils.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';
import PropTypes from 'prop-types';
import Head from 'next/head';

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/head/MetaDescription.jsx";

var MetaDescription = function MetaDescription(_ref) {
  var value = _ref.value;
  if (!value) return null;
  return React.createElement(Head, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, React.createElement("meta", {
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
  return React.createElement(Head, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 27
    },
    __self: this
  }, React.createElement("title", {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 28
    },
    __self: this
  }, isFn(render) ? render() : title));
};

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/components/head/RelCanonical.jsx";

var RelCanonical = function RelCanonical(_ref) {
  var origin = _ref.origin,
      pathname = _ref.pathname;
  return React.createElement(Head, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 8
    },
    __self: this
  }, React.createElement("link", {
    rel: "canonical",
    href: "".concat(origin, "/").concat(cleanPath(pathname)),
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

export { MetaDescription, PageTitle, RelCanonical };
