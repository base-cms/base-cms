"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _head = _interopRequireDefault(require("next/head"));

var _cleanPath = _interopRequireDefault(require("../utils/clean-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelCanonicalElement = function RelCanonicalElement(_ref) {
  var origin = _ref.origin,
      pathname = _ref.pathname;
  return _react.default.createElement(_head.default, null, _react.default.createElement("link", {
    rel: "canonical",
    href: "".concat(origin, "/").concat((0, _cleanPath.default)(pathname))
  }));
};

RelCanonicalElement.propTypes = {
  pathname: _propTypes.default.string.isRequired,
  origin: _propTypes.default.string.isRequired
};
var _default = RelCanonicalElement;
exports.default = _default;