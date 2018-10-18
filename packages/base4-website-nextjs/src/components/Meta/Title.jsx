import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ value, siteName, concateWith }) => {
  const title = siteName ? `${value} ${concateWith} ${siteName}` : value;
  return <title>{title}</title>;
};

Title.propTypes = {
  value: PropTypes.string.isRequired,
  siteName: PropTypes.string,
  concateWith: PropTypes.string,
};

Title.defaultProps = {
  siteName: null,
  concateWith: '|',
};

export default Title;
