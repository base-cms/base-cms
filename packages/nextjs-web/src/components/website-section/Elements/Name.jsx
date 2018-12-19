import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';

const propTypes = {
  collapsible: PropTypes.bool,
  section: PropTypes.shape({
    name: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  section: {},
  tag: 'h1',
};

const WebsiteSectionName = ({ section, ...rest }) => (
  <ObjectValue path="name" obj={section} {...rest} />
);

WebsiteSectionName.displayName = 'WebsiteSection/Elements/Name';
WebsiteSectionName.propTypes = propTypes;
WebsiteSectionName.defaultProps = defaultProps;

export default WebsiteSectionName;
