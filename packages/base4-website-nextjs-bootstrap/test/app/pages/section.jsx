import React from 'react';
import { withWebsiteSection } from '@base-cms/base4-website-nextjs/hoc';
import {
  Name,
  Description,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/website-section';

import {
  Row,
  Col,
} from 'reactstrap';

import withLayout from '../../../src/layouts/withLayout';
import DefaultLayout from '../layouts/Default';
import {
  BlockHeroA,
  BlockListGroupA,
  BlockListGroupB,
  BlockListGroupC,
} from '../../../src/website-scheduled-content';

const MutedHeader = ({ children }) => (
  <h3 className="text-muted">
    {children}
  </h3>
);

const SectionPage = ({ section }) => (
  <Wrapper section={section}>
    <Name tag="h2" section={section} />
    <Description tag="p" section={section} />
    <hr />
    <hr />
    <h1>Blocks</h1>

    <h2>Hero A</h2>
    <MutedHeader>Standard Image</MutedHeader>
    <BlockHeroA
      query={{
        sectionId: section.id,
        first: 7,
        requiresImage: true,
      }}
    />

    <hr />

    <h2>Card List Group A</h2>
    <MutedHeader>xl=4, lg=6, xs=12 w/header</MutedHeader>
    <Row>
      <Col xl="4" lg="6" xs="12">
        <BlockListGroupA
          header="Video"
          query={{
            sectionId: section.id,
            first: 4,
            requiresImage: true,
            includeContentTypes: ['Video']
          }}
        />
      </Col>
    </Row>

    <hr />

    <h2>Card List Group B</h2>
    <MutedHeader>xl=4, lg=6, xs=12 w/header</MutedHeader>
    <Row>
      <Col xl="4" lg="6" xs="12">
        <BlockListGroupB
          header="Video"
          query={{
            sectionId: section.id,
            first: 4,
            requiresImage: true,
            includeContentTypes: ['Video']
          }}
        />
      </Col>
    </Row>

    <hr />

    <h2>Card List Group C</h2>
    <MutedHeader>xl=4, lg=6, xs=12 w/header</MutedHeader>
    <Row>
      <Col xl="4" lg="6" xs="12">
        <BlockListGroupC
          header="Video"
          query={{
            sectionId: section.id,
            first: 5,
            requiresImage: true,
            includeContentTypes: ['Video']
          }}
        />
      </Col>
    </Row>

  </Wrapper>
);

export default withLayout(DefaultLayout)(
  withWebsiteSection()(
    SectionPage
  )
);
