'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-9e05845b.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var router = require('next/router');
var utils = require('./utils.js');
var __chunk_5 = require('./chunk-3a2a9c7d.js');
var __chunk_6 = require('./chunk-8200e246.js');
require('inflected');
require('escape-string-regexp');
require('moment');
require('object-path');
require('next/config');
require('./routing.js');
require('./chunk-4b678d5c.js');

var propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  router: PropTypes.object.isRequired,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps = {
  tag: 'nav'
};

var Wrapper = function Wrapper(_ref) {
  var children = _ref.children,
      router$$1 = _ref.router,
      Tag = _ref.tag,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "router", "tag"]);

  var asPath = router$$1.asPath,
      route = router$$1.route;
  return React__default.createElement(Tag, __chunk_1._extends({
    "data-route": utils.cleanPath(route),
    "data-path": utils.cleanPath(asPath)
  }, attrs), children);
};

Wrapper.displayName = 'Core/Navigation/Wrapper';
Wrapper.propTypes = propTypes;
Wrapper.defaultProps = defaultProps;
var Wrapper$1 = router.withRouter(Wrapper);

exports.DateElement = __chunk_5.Date;
exports.HTMLElement = __chunk_5.HTML;
exports.ObjectValueElement = __chunk_5.ObjectValue;
exports.ValueElement = __chunk_5.Value;
exports.LinkElement = __chunk_6.LinkElement;
exports.NavigationWrapper = Wrapper$1;
