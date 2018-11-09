import React from 'react';
import PropTypes from 'prop-types';
import { SiteNavbar } from '../../../src/core';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultProps = {};

const DefaultLayout = ({ children }) => (
  <>
    <SiteNavbar className="sticky-top navbar-dark bg-dark shadow" />
    <main className="container container--default">
      <div className="row">
        <div className="col my-3">
          {children}
        </div>
      </div>
    </main>
  </>
);

DefaultLayout.displayName = 'TestApp/Layouts/Default';
DefaultLayout.propTypes = propTypes;
DefaultLayout.defaultProps = defaultProps;

export default DefaultLayout;
