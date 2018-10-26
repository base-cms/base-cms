import React from 'react';
import PropTypes from 'prop-types';
import DateFieldValue from './DateFieldValue';

const propTypes = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    published: PropTypes.string,
  }),
  format: PropTypes.string,
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  content: {},
  format: 'MMM Do, YYYY',
  tag: 'div',
};

const ContentPublishedDate = ({ content, ...rest }) => (
  <DateFieldValue path="published" data={content} {...rest} />
);

ContentPublishedDate.propTypes = propTypes;
ContentPublishedDate.defaultProps = defaultProps;

export default ContentPublishedDate;
