import { j as _objectWithoutProperties, f as _extends } from './chunk-cc870ac4.js';
import React from 'react';
import './chunk-fccae6e7.js';
import { cleanPath } from './utils.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';
import PropTypes from 'prop-types';
export { d as DateElement, a as HTMLElement, c as ObjectValueElement, b as ValueElement } from './chunk-e4c58053.js';
import './routing.js';
export { a as LinkElement } from './chunk-38c44d2b.js';
import classNames from 'classnames';
import { withRouter } from 'next/router';

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/core/PlaceholderAd.jsx";
var propTypes = {
  className: PropTypes.string,
  size: PropTypes.string.isRequired
};
var defaultProps = {
  className: null
};

var PlaceholderAd = function PlaceholderAd(_ref) {
  var className = _ref.className,
      size = _ref.size;
  return React.createElement("div", {
    className: classNames('text-center', className),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, React.createElement("img", {
    src: "https://dummyimage.com/".concat(size, "/ccc/000"),
    alt: "".concat(size, " Advertisement"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }));
};

PlaceholderAd.propTypes = propTypes;
PlaceholderAd.defaultProps = defaultProps;

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/components/core/Navigation/Wrapper.jsx";
var propTypes$1 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  router: PropTypes.object.isRequired,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$1 = {
  tag: 'nav'
};

var Wrapper = function Wrapper(_ref) {
  var children = _ref.children,
      router = _ref.router,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["children", "router", "tag"]);

  var asPath = router.asPath,
      route = router.route;
  return React.createElement(Tag, _extends({
    "data-route": cleanPath(route),
    "data-path": cleanPath(asPath)
  }, attrs, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 24
    },
    __self: this
  }), children);
};

Wrapper.displayName = 'Core/Navigation/Wrapper';
Wrapper.propTypes = propTypes$1;
Wrapper.defaultProps = defaultProps$1;
var Wrapper$1 = withRouter(Wrapper);

export { Wrapper$1 as NavigationWrapper, PlaceholderAd };
