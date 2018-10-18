import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ value }) => {
  if (!value) return null;
  return <meta name="description" content={value} />;
};

Description.propTypes = {
  value: PropTypes.string,
};

Description.defaultProps = {
  value: null,
};

export default Description;
