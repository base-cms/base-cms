import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { isFunction as isFn, cleanPath } from './utils.js';
import './chunk-1a4eb17c.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';

var MetaDescription = function MetaDescription(_ref) {
  var value = _ref.value;
  if (!value) return null;
  return React.createElement(Head, null, React.createElement("meta", {
    name: "description",
    content: value
  }));
};

MetaDescription.propTypes = {
  value: PropTypes.string
};
MetaDescription.defaultProps = {
  value: null
};

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
  return React.createElement(Head, null, React.createElement("title", null, isFn(render) ? render() : title));
};

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;

var RelCanonical = function RelCanonical(_ref) {
  var origin = _ref.origin,
      pathname = _ref.pathname;
  return React.createElement(Head, null, React.createElement("link", {
    rel: "canonical",
    href: "".concat(origin, "/").concat(cleanPath(pathname))
  }));
};

RelCanonical.propTypes = {
  pathname: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired
};

export { MetaDescription, PageTitle, RelCanonical };
