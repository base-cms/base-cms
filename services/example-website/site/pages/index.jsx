import React from 'react';
import { withLayout } from '@base-cms/nextjs-web/hoc';
import DefaultLayout from '../layouts/Default';

const IndexPage = () => (
  <h1>Home Page</h1>
);

export default withLayout(DefaultLayout)(IndexPage);
