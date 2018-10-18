'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_5 = require('./chunk-d4fdf81b.js');
require('next/head');
require('./chunk-c2e7f00c.js');

var Title = function Title(_ref) {
  var value = _ref.value,
      siteName = _ref.siteName,
      concateWith = _ref.concateWith;
  var title = siteName ? "".concat(value, " ").concat(concateWith, " ").concat(siteName) : value;
  return React__default.createElement("title", null, title);
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
  return React__default.createElement("meta", {
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

exports.RelCanonical = __chunk_5.RelCanonical;
exports.Meta = index$1;
