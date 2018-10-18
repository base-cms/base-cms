import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Title = ({ value, siteName, concateWith }) => {
  const title = siteName ? `${value} ${concateWith} ${siteName}` : value;
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
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
