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

exports.RelCanonical = RelCanonicalElement;
