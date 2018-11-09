import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkElement from '../core/Elements/Link';
import { sectionPath } from '../../utils';

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
  // The inner value to render by default.
  value: PropTypes.node,
};

const defaultProps = {
  asHTML: false,
  children: undefined,
  className: null,
  collapsible: true,
  params: undefined,
  value: null,
};
// @todo Do not make this clickable if the canonicalPath matches the route.
const WebsiteSectionLink = ({
  alias,
  className,
  id,
  routePrefix,
  ...rest
}) => (
  <LinkElement to={sectionPath(alias)} className={classNames('website-section__link', `website-section__link--${id}`, className)} {...rest} />
);

WebsiteSectionLink.displayName = 'WebsiteSection/Link';
WebsiteSectionLink.propTypes = propTypes;
WebsiteSectionLink.defaultProps = defaultProps;

export default WebsiteSectionLink;
