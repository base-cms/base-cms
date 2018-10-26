import React from 'react';
import PropTypes from 'prop-types';
import FieldValue from './FieldValue';

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
  <FieldValue path="name" data={content} {...rest} />
);

ContentName.propTypes = propTypes;
ContentName.defaultProps = defaultProps;

export default ContentName;
