import React from 'react';
import withLayout from '../../../src/layouts/withLayout';
import DefaultLayout from '../layouts/Default';

const IndexPage = () => (
  <h1>Home Page</h1>
);
export default withLayout(DefaultLayout)(IndexPage);
