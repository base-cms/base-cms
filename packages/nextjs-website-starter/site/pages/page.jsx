import React from 'react';
import { withDynamicPage } from '@base-cms/base4-website-nextjs/hoc';
import { createMarkup } from '@base-cms/base4-website-nextjs/utils';

const DynamicPage = ({ page }) => (
  <>
    <h1>{page.name}</h1>
    <div dangerouslySetInnerHTML={createMarkup(page.body)} />
  </>
);

export default withDynamicPage(DynamicPage);
