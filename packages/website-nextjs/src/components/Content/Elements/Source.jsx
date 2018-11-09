import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';

const propTypes = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    name: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  content: {},
  tag: 'span',
};

const ContentSource = ({ content, ...rest }) => (
  <ObjectValue path="source" obj={content} {...rest} />
);

ContentSource.displayName = 'Content/Elements/Source';
ContentSource.propTypes = propTypes;
ContentSource.defaultProps = defaultProps;

export default ContentSource;
