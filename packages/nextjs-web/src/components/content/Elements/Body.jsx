import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';

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
  <ObjectValue asHTML path="body" obj={content} {...rest} />
);

ContentBody.displayName = 'Content/Elements/Body';
ContentBody.propTypes = propTypes;
ContentBody.defaultProps = defaultProps;

export default ContentBody;
