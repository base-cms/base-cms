import React from 'react';
import PropTypes from 'prop-types';
import LinkElement from '../core/LinkElement';
import { cleanPath } from '../../utils';

const propTypes = {
  // The website section alias.
  alias: PropTypes.string.isRequired,
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  // The route prefix to prepend to the alias.
  routePrefix: PropTypes.string,
  // The inner value to render by default.
  value: PropTypes.node,
};

const defaultProps = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  params: undefined,
  routePrefix: 'section',
  value: null,
};
// @todo Do not make this clickable if the canonicalPath matches the route.
const WebsiteSectionLink = ({ alias, routePrefx, ...rest }) => {
  const to = routePrefx ? `${routePrefx}/${cleanPath(alias)}` : alias;
  return (
    <LinkElement to={to} className="website-section__link" {...rest} />
  );
};

WebsiteSectionLink.propTypes = propTypes;
WebsiteSectionLink.defaultProps = defaultProps;

export default WebsiteSectionLink;
