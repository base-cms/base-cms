import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';

const propTypes = {
  collapsible: PropTypes.bool,
  page: PropTypes.shape({
    name: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  page: {},
  tag: 'h1',
};

const DynamicPageName = ({ page, ...rest }) => (
  <ObjectValue path="name" obj={page} {...rest} />
);

DynamicPageName.displayName = 'DynamicPage/Elements/Name';
DynamicPageName.propTypes = propTypes;
DynamicPageName.defaultProps = defaultProps;

export default DynamicPageName;
