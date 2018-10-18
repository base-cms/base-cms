import React from 'react';
import { withPlatformContent } from '@base-cms/base4-website-nextjs/hoc';

const ContentPage = ({ content }) => (
  <>
    <h1>Default Content Page</h1>
    <h2>{content.name}</h2>
  </>
);

export default withPlatformContent(ContentPage);
