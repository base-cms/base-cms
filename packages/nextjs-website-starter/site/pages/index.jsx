import React from 'react';
import { DefaultLayout, withLayout } from '@base-cms/base4-website-nextjs-bootstrap/layouts';

const IndexPage = () => (
  <h1>Default Home Page</h1>
);

export default withLayout(DefaultLayout)(IndexPage);
