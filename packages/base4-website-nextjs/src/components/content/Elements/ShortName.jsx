import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';

const propTypes = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  content: {},
  tag: 'h5',
};

const ContentShortName = ({ content, ...rest }) => (
  <ObjectValue asHTML path="shortName" obj={content} {...rest} />
);

ContentShortName.displayName = 'Content/Elements/ShortName';
ContentShortName.propTypes = propTypes;
ContentShortName.defaultProps = defaultProps;

export default ContentShortName;
