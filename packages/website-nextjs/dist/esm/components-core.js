import { j as _extends, i as _objectWithoutProperties } from './chunk-1a4eb17c.js';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { cleanPath } from './utils.js';
import { d as Date$1, b as HTML, c as ObjectValue, a as Value } from './chunk-3ea85008.js';
export { d as DateElement, b as HTMLElement, c as ObjectValueElement, a as ValueElement } from './chunk-3ea85008.js';
import { a as LinkElement } from './chunk-b58e65a9.js';
export { a as LinkElement } from './chunk-b58e65a9.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';
import './routing.js';
import './chunk-7976a9a0.js';

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
      router = _ref.router,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["children", "router", "tag"]);

  var asPath = router.asPath,
      route = router.route;
  return React.createElement(Tag, _extends({
    "data-route": cleanPath(route),
    "data-path": cleanPath(asPath)
  }, attrs), children);
};

Wrapper.displayName = 'Core/Navigation/Wrapper';
Wrapper.propTypes = propTypes;
Wrapper.defaultProps = defaultProps;
var Wrapper$1 = withRouter(Wrapper);

export { Wrapper$1 as NavigationWrapper };
