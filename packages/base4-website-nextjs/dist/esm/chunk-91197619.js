import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { a as cleanPath } from './chunk-5198f64a.js';

var RelCanonicalElement = function RelCanonicalElement(_ref) {
  var origin = _ref.origin,
      pathname = _ref.pathname;
  return React.createElement(Head, null, React.createElement("link", {
    rel: "canonical",
    href: "".concat(origin, "/").concat(cleanPath(pathname))
  }));
};

RelCanonicalElement.propTypes = {
  pathname: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired
};

var Title = function Title(_ref) {
  var value = _ref.value,
      siteName = _ref.siteName,
      concateWith = _ref.concateWith;
  var title = siteName ? "".concat(value, " ").concat(concateWith, " ").concat(siteName) : value;
  return React.createElement("title", null, title);
};

Title.propTypes = {
  value: PropTypes.string.isRequired,
  siteName: PropTypes.string,
  concateWith: PropTypes.string
};
Title.defaultProps = {
  siteName: null,
  concateWith: '|'
};

var Description = function Description(_ref) {
  var value = _ref.value;
  if (!value) return null;
  return React.createElement("meta", {
    name: "description",
    content: value
  });
};

Description.propTypes = {
  value: PropTypes.string
};
Description.defaultProps = {
  value: null
};

var Meta = {
  Title: Title,
  Description: Description
};

var index = /*#__PURE__*/Object.freeze({
  default: Meta
});

export { RelCanonicalElement as a, Meta as b, index as c };
