import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { cleanPath } from '../../utils';

const RelCanonical = ({ origin, pathname }) => (
  <Head>
    <link rel="canonical" href={`${origin}/${cleanPath(pathname)}`} />
  </Head>
);

RelCanonical.propTypes = {
  pathname: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
};

export default RelCanonical;
