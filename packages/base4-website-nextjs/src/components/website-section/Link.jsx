import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkElement from '../core/Elements/Link';
import { cleanPath } from '../../utils';

const propTypes = {
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
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  // The route prefix to prepend to the alias.
  routePrefix: PropTypes.string,
  // The inner value to render by default.
  value: PropTypes.node,
};

const defaultProps = {
  asHTML: false,
  children: undefined,
  className: null,
  collapsible: true,
  params: undefined,
  routePrefix: 'section',
  value: null,
};
// @todo Do not make this clickable if the canonicalPath matches the route.
const WebsiteSectionLink = ({
  alias,
  className,
  id,
  routePrefix,
  ...rest
}) => {
  const to = routePrefix ? `${routePrefix}/${cleanPath(alias)}` : alias;
  return (
    <LinkElement to={to} className={classNames('website-section__link', `website-section__link--${id}`, className)} {...rest} />
  );
};

WebsiteSectionLink.displayName = 'WebsiteSection/Link';
WebsiteSectionLink.propTypes = propTypes;
WebsiteSectionLink.defaultProps = defaultProps;

export default WebsiteSectionLink;
