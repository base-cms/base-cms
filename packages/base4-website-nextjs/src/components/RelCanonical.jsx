import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { cleanPath } from '../utils';

const CanonicalURL = ({ origin, pathname }) => (
  <Head>
    <link rel="canonical" href={`${origin}/${cleanPath(pathname)}`} />
  </Head>
);

CanonicalURL.propTypes = {
  pathname: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
};

export default CanonicalURL;
