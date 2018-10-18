'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var Head = _interopDefault(require('next/head'));
var __chunk_1 = require('./chunk-c2e7f00c.js');

var RelCanonicalElement = function RelCanonicalElement(_ref) {
  var origin = _ref.origin,
      pathname = _ref.pathname;
  return React__default.createElement(Head, null, React__default.createElement("link", {
    rel: "canonical",
    href: "".concat(origin, "/").concat(__chunk_1.cleanPath(pathname))
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
  return React__default.createElement(Head, null, React__default.createElement("title", null, title));
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
  return React__default.createElement(Head, null, React__default.createElement("meta", {
    name: "description",
    content: value
  }));
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

exports.RelCanonical = RelCanonicalElement;
exports.Meta = Meta;
exports.index = index;
