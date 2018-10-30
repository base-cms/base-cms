import { j as _extends, i as _objectWithoutProperties } from './chunk-1a4eb17c.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { a as LinkElement } from './chunk-435dde02.js';
import { cleanPath } from './utils.js';

var propTypes = {
  // The website section alias.
  alias: PropTypes.string.isRequired,
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  className: PropTypes.string,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // The section id.
  id: PropTypes.number.isRequired,
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
  className: null,
  collapsible: true,
  params: undefined,
  routePrefix: 'section',
  value: null
}; // @todo Do not make this clickable if the canonicalPath matches the route.

var WebsiteSectionLink = function WebsiteSectionLink(_ref) {
  var alias = _ref.alias,
      className = _ref.className,
      id = _ref.id,
      routePrefix = _ref.routePrefix,
      rest = _objectWithoutProperties(_ref, ["alias", "className", "id", "routePrefix"]);

  var to = routePrefix ? "".concat(routePrefix, "/").concat(cleanPath(alias)) : alias;
  return React.createElement(LinkElement, _extends({
    to: to,
    className: classNames('website-section__link', "website-section__link--".concat(id), className)
  }, rest));
};

WebsiteSectionLink.displayName = 'WebsiteSection/Link';
WebsiteSectionLink.propTypes = propTypes;
WebsiteSectionLink.defaultProps = defaultProps;

export { WebsiteSectionLink as a };
