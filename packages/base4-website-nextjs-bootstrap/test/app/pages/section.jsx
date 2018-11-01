import React from 'react';
import {
  withWebsiteSection,
} from '@base-cms/base4-website-nextjs/hoc';
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
  BlockCardDeckA,
  BlockCardDeckB,
  BlockHeroA,
  BlockListGroupA,
  BlockListGroupB,
  BlockListGroupC,
  BlockListGroupD,
} from '../../../src/website-scheduled-content';
import {
  PlaceholderAd,
} from '../../../src/core';

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

    <h2>List Groups</h2>
    <Row>
      <Col xl="4" lg="6" xs="12" className="mb-3">
        <BlockListGroupA
          className="h-100"
          header="Group A (xl=4, lg=6, xs=12)"
          query={{
            sectionId: section.id,
            first: 4,
            requiresImage: true,
            includeContentTypes: ['Video']
          }}
        />
      </Col>
      <Col xl="4" lg="6" xs="12" className="mb-3">
        <BlockListGroupB
          className="h-100"
          header="Group B (xl=4, lg=6, xs=12)"
          query={{
            sectionId: section.id,
            first: 4,
            requiresImage: true,
            includeContentTypes: ['Video']
          }}
        />
      </Col>
      <Col xl="4" lg="6" xs="12" className="mb-3">
        <BlockListGroupC
          className="h-100"
          header="Group C (xl=4, lg=6, xs=12)"
          query={{
            sectionId: section.id,
            first: 5,
            requiresImage: true,
            includeContentTypes: ['Video']
          }}
        />
      </Col>
      <Col xl="4" lg="6" xs="12" className="mb-3">
        <BlockListGroupD
          className="h-100"
          header="Group D (xl=4, lg=6, xs=12)"
          query={{
            sectionId: section.id,
            first: 5,
            requiresImage: true,
            includeContentTypes: ['Video']
          }}
        />
      </Col>
    </Row>

    <hr />

    <h2>Card Deck A</h2>
    <BlockCardDeckA
      query={{
        sectionId: section.id,
        first: 8,
        requiresImage: true,
        includeContentTypes: ['Video']
      }}
      interstitial={() => <PlaceholderAd size="300x250" />}
    />

    <h2>Card Deck B</h2>
    <BlockCardDeckB
      query={{
        sectionId: section.id,
        first: 4,
        requiresImage: true,
        includeContentTypes: ['Video']
      }}
    />


  </Wrapper>
);

export default withLayout(DefaultLayout)(
  withWebsiteSection()(
    SectionPage
  )
);
