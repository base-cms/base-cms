import React from 'react';
import { withLayout } from '@base-cms/base4-website-nextjs-bootstrap/layouts';
import DefaultLayout from '../layouts/Default';

const IndexPage = () => (
  <h1>Default Home Page</h1>
);

export default withLayout(DefaultLayout)(IndexPage);
