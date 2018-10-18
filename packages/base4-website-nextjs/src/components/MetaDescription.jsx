import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const MetaDescription = ({ value }) => {
  if (!value) return null;
  return (
    <Head>
      <meta name="description" content={value} />
    </Head>
  );
};

MetaDescription.propTypes = {
  value: PropTypes.string,
};

MetaDescription.defaultProps = {
  value: null,
};

export default MetaDescription;
