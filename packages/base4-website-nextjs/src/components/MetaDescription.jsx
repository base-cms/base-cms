import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Description = ({ value }) => {
  if (!value) return null;
  return (
    <Head>
      <meta name="description" content={value} />
    </Head>
  );
};

Description.propTypes = {
  value: PropTypes.string,
};

Description.defaultProps = {
  value: null,
};

export default Description;
