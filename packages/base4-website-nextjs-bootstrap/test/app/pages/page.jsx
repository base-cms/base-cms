import React from 'react';
import withLayout from '../../../src/layouts/withLayout';
import DefaultLayout from '../layouts/Default';

const DynamicPage = () => (
  <h1>Dynamic Page</h1>
);
export default withLayout(DefaultLayout)(DynamicPage);
