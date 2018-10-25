import React from 'react';
import PropTypes from 'prop-types';
import FieldValue from './FieldValue';

const propTypes = {
  collapsable: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsable: false,
  content: {},
  tag: 'h5',
};

const ContentShortName = ({ content, ...rest }) => (
  <FieldValue asHTML path="shortName" data={content} {...rest} />
);

ContentShortName.propTypes = propTypes;
ContentShortName.defaultProps = defaultProps;

export default ContentShortName;
