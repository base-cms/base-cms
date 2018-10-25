import React from 'react';
import PropTypes from 'prop-types';
import LinkElement from '../LinkElement';

const propTypes = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // The content canonical path.
  canonicalPath: PropTypes.string.isRequired,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsable: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  // The inner value to render by default.
  value: PropTypes.node,
};

const defaultProps = {
  asHTML: false,
  children: undefined,
  collapsable: false,
  params: undefined,
  value: null,
};

const ContentLink = ({ canonicalPath, ...rest }) => (
  <LinkElement to={canonicalPath} className="content__link" {...rest} />
);

ContentLink.propTypes = propTypes;
ContentLink.defaultProps = defaultProps;

export default ContentLink;
