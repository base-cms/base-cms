import React from 'react';
import PropTypes from 'prop-types';
import FieldValue from './FieldValue';

const propTypes = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    teaser: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  content: {},
  tag: 'div',
};

const ContentTeaser = ({ content, ...rest }) => (
  <FieldValue asHTML path="teaser" data={content} {...rest} />
);

ContentTeaser.propTypes = propTypes;
ContentTeaser.defaultProps = defaultProps;

export default ContentTeaser;
