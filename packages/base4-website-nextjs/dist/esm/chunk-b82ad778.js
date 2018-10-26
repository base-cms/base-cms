import { a as _extends, b as _objectWithoutProperties } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import { c as LinkElement } from './chunk-742fd19b.js';
import { cleanPath } from './utils.js';

var propTypes = {
  // The website section alias.
  alias: PropTypes.string.isRequired,
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  // The route prefix to prepend to the alias.
  routePrefix: PropTypes.string,
  // The inner value to render by default.
  value: PropTypes.node
};
var defaultProps = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  params: undefined,
  routePrefix: 'section',
  value: null
}; // @todo Do not make this clickable if the canonicalPath matches the route.

var WebsiteSectionLink = function WebsiteSectionLink(_ref) {
  var alias = _ref.alias,
      routePrefx = _ref.routePrefx,
      rest = _objectWithoutProperties(_ref, ["alias", "routePrefx"]);

  var to = routePrefx ? "".concat(routePrefx, "/").concat(cleanPath(alias)) : alias;
  return React.createElement(LinkElement, _extends({
    to: to,
    className: "website-section__link"
  }, rest));
};

WebsiteSectionLink.propTypes = propTypes;
WebsiteSectionLink.defaultProps = defaultProps;

export { WebsiteSectionLink as a };
