import React from 'react';
import withLayout from '../../../src/layouts/withLayout';
import DefaultLayout from '../layouts/Default';

const ContentPage = () => (
  <h1>Content Page</h1>
);
export default withLayout(DefaultLayout)(ContentPage);
