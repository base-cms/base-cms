import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { isFunction as isFn } from '../../utils';

const propTypes = {
  children: PropTypes.func,
  concateWith: PropTypes.string,
  siteName: PropTypes.string,
  value: PropTypes.string.isRequired,
};

const defaultProps = {
  children: undefined,
  concateWith: '|',
  siteName: null,
};

const PageTitle = ({
  children: render,
  concateWith,
  siteName,
  value,
}) => {
  const title = siteName ? `${value} ${concateWith} ${siteName}` : value;
  return (
    <Head>
      <title>{isFn(render) ? render() : title}</title>
    </Head>
  );
};

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;

export default PageTitle;
