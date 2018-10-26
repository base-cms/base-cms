import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import FieldValue from './FieldValue';

const propTypes = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: false,
  content: {},
  tag: 'h5',
};

const ContentShortName = ({ content, ...rest }) => (
  <FieldValue asHTML path="shortName" data={content} {...rest} />
);

ContentShortName.propTypes = propTypes;
ContentShortName.defaultProps = defaultProps;
ContentShortName.fragments = {
  content: gql`
    fragment PlatformContentShortName on PlatformContent {
      shortName
    }
  `,
};

export default ContentShortName;
