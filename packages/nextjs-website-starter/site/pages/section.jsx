import React from 'react';
import { withWebsiteSection } from '@base-cms/base4-website-nextjs/hoc';

const SectionPage = ({ section }) => (
  <>
    <h1>Default Section Page</h1>
    <h2>{section.name}</h2>
  </>
);

export default withWebsiteSection(SectionPage);
