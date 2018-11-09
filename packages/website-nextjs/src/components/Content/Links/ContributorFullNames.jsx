import React from 'react';
import PropTypes from 'prop-types';
import ContactFullNameLinks from './ContactFullNames';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  elementAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  linkAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  elementAttrs: {},
  linkAttrs: {},
  prefix: null,
  tag: 'div',
};

const ContributorFullNameLinks = props => (
  <ContactFullNameLinks path="contributors" {...props} />
);

ContributorFullNameLinks.displayName = 'Content/Links/ContributorFullNames';
ContributorFullNameLinks.propTypes = propTypes;
ContributorFullNameLinks.defaultProps = defaultProps;

export default ContributorFullNameLinks;
