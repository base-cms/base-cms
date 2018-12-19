import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavigationWrapper } from '@base-cms/nextjs-web/components/core';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

const SiteNavbar = ({ className, children }) => (
  <NavigationWrapper className={classNames('navigation navigation--site navbar', className)}>
    {children}
  </NavigationWrapper>
);

SiteNavbar.displayName = 'Core/SiteNavbar';
SiteNavbar.propTypes = propTypes;
SiteNavbar.defaultProps = defaultProps;

export default SiteNavbar;
