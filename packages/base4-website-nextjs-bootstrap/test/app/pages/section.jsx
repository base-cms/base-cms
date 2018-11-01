import React from 'react';
import { withWebsiteSection } from '@base-cms/base4-website-nextjs/hoc';
import {
  Name,
  Description,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/website-section';
import withLayout from '../../../src/layouts/withLayout';
import DefaultLayout from '../layouts/Default';
import { BlockCardListGroupA } from '../../../src/website-scheduled-content';

const SectionPage = ({ section }) => (
  <Wrapper section={section}>
    <Name tag="h2" section={section} />
    <Description tag="p" section={section} />
    <hr />
    <hr />
    <h1>Blocks</h1>
    <h2>Card List Group A</h2>
    <h3 className="text-muted">col-4 w/header</h3>
    <div className="row">
      <div className="col-4">
        <BlockCardListGroupA
          className="h-100"
          header="Video"
          query={{
            sectionId: section.id,
            first: 4,
            requiresImage: true,
            includeContentTypes: ['Video']
          }}
        />
      </div>
    </div>

  </Wrapper>
);

export default withLayout(DefaultLayout)(
  withWebsiteSection()(
    SectionPage
  )
);
