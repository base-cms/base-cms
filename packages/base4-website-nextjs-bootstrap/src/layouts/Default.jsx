import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultProps = {};

const DefaultLayout = ({ children }) => (
  <main className="container container--default">
    <div className="row">
      <div className="col my-3">
        {children}
      </div>
    </div>
  </main>
);

DefaultLayout.displayName = 'Layouts/Default';
DefaultLayout.propTypes = propTypes;
DefaultLayout.defaultProps = defaultProps;

export default DefaultLayout;
