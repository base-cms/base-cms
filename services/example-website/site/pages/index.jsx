import React from 'react';
import { withLayout } from '@base-cms/website-nextjs-bootstrap/layouts';
import DefaultLayout from '../layouts/Default';

const IndexPage = () => (
  <h1>Home Page</h1>
);

export default withLayout(DefaultLayout)(IndexPage);
