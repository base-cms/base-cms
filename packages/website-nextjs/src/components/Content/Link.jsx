import React from 'react';
import PropTypes from 'prop-types';
import LinkElement from '../core/Elements/Link';

const propTypes = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // The content canonical path.
  canonicalPath: PropTypes.string.isRequired,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  // The inner value to render by default.
  value: PropTypes.node,
};

const defaultProps = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  params: undefined,
  value: null,
};
// @todo Do not make this clickable if the canonicalPath matches the route.
const ContentLink = ({ canonicalPath, ...rest }) => (
  <LinkElement to={canonicalPath} className="content__link" {...rest} />
);

ContentLink.displayName = 'Content/Link';
ContentLink.propTypes = propTypes;
ContentLink.defaultProps = defaultProps;

export default ContentLink;
