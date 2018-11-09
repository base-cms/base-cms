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
  tag: 'h1',
};

const ContentName = ({ content, ...rest }) => (
  <ObjectValue path="name" obj={content} {...rest} />
);

ContentName.displayName = 'Content/Elements/Name';
ContentName.propTypes = propTypes;
ContentName.defaultProps = defaultProps;

export default ContentName;
