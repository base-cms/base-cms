import React from 'react';
import { withWebsiteSection } from '@base-cms/base4-website-nextjs/hoc';
import {
  Name,
  Description,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/website-section';
import { BlockListGroupA } from '@base-cms/base4-website-nextjs-bootstrap/website-scheduled-content';

const SectionPage = ({ section }) => (
  <Wrapper section={section}>
    <Name section={section} />
    <Description tag="p" section={section} />
    <hr />
    <BlockListGroupA
      query={{
        sectionId: section.id,
        first: 7,
      }}
    />
  </Wrapper>
);

export default withWebsiteSection()(SectionPage);
