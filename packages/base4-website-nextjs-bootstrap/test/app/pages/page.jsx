import React from 'react';
import { withDynamicPage } from '@base-cms/base4-website-nextjs/hoc';
import {
  Body,
  Name,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/dynamic-page';
import withLayout from '../../../src/layouts/withLayout';
import DefaultLayout from '../layouts/Default';

const DynamicPage = ({ page }) => (
  <Wrapper page={page}>
    <Name page={page} />
    <Body page={page} />
  </Wrapper>
);

export default withLayout(DefaultLayout)(
  withDynamicPage(
    DynamicPage
  )
);
