import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';

const propTypes = {
  collapsible: PropTypes.bool,
  section: PropTypes.shape({
    description: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  section: {},
  tag: 'div',
};

const WebsiteSectionDescription = ({ section, ...rest }) => (
  <ObjectValue asHTML path="description" obj={section} {...rest} />
);

WebsiteSectionDescription.displayName = 'WebsiteSection/Elements/Description';
WebsiteSectionDescription.propTypes = propTypes;
WebsiteSectionDescription.defaultProps = defaultProps;

export default WebsiteSectionDescription;
