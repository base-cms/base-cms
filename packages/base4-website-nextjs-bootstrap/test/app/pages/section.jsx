import React from 'react';
import withLayout from '../../../src/layouts/withLayout';
import DefaultLayout from '../layouts/Default';

const SectionPage = () => (
  <h1>Section Page</h1>
);
export default withLayout(DefaultLayout)(SectionPage);
