import React from 'react';
import PropTypes from 'prop-types';
import { a as RelCanonical } from './chunk-c2a2fd6b.js';
export { a as RelCanonical } from './chunk-c2a2fd6b.js';
import 'next/head';
import './chunk-5198f64a.js';

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

var index = {
  Title: Title,
  Description: Description
};

var index$1 = /*#__PURE__*/Object.freeze({
  default: index
});

export { index$1 as Meta };
