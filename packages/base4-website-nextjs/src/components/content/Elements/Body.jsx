import React from 'react';
import PropTypes from 'prop-types';
import FieldValue from './FieldValue';

const propTypes = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    body: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  content: {},
  tag: 'div',
};

const ContentBody = ({ content, ...rest }) => (
  <FieldValue asHTML path="body" data={content} {...rest} />
);

ContentBody.propTypes = propTypes;
ContentBody.defaultProps = defaultProps;

export default ContentBody;
