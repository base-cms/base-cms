import React from 'react';
import { withDynamicPage } from '@base-cms/base4-website-nextjs/hoc';
import {
  Body,
  Name,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/dynamic-page';

const DynamicPage = ({ page }) => (
  <Wrapper page={page}>
    <Name page={page} />
    <Body page={page} />
  </Wrapper>
);

export default withDynamicPage(DynamicPage);
