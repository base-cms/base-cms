import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';

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
  <ObjectValue asHTML path="teaser" obj={content} {...rest} />
);

ContentTeaser.displayName = 'Content/Elements/Teaser';
ContentTeaser.propTypes = propTypes;
ContentTeaser.defaultProps = defaultProps;

export default ContentTeaser;
