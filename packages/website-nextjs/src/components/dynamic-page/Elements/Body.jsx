import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';

const propTypes = {
  collapsible: PropTypes.bool,
  page: PropTypes.shape({
    body: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  page: {},
  tag: 'div',
};

const DynamicPageBody = ({ page, ...rest }) => (
  <ObjectValue asHTML path="body" obj={page} {...rest} />
);

DynamicPageBody.displayName = 'DynamicPage/Elements/Body';
DynamicPageBody.propTypes = propTypes;
DynamicPageBody.defaultProps = defaultProps;

export default DynamicPageBody;
