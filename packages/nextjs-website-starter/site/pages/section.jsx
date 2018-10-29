import React from 'react';
import { withWebsiteSection } from '@base-cms/base4-website-nextjs/hoc';
import {
  Name,
  Description,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/website-section';

const SectionPage = ({ section }) => (
  <Wrapper section={section}>
    <Name section={section} />
    <Description tag="p" section={section} />
  </Wrapper>
);

export default withWebsiteSection()(SectionPage);
