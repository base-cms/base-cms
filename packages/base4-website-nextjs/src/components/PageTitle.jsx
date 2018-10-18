import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const PageTitle = ({ value, siteName, concateWith }) => {
  const title = siteName ? `${value} ${concateWith} ${siteName}` : value;
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

PageTitle.propTypes = {
  value: PropTypes.string.isRequired,
  siteName: PropTypes.string,
  concateWith: PropTypes.string,
};

PageTitle.defaultProps = {
  siteName: null,
  concateWith: '|',
};

export default PageTitle;
