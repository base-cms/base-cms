import React from 'react';
import { withWebsiteSection } from '@base-cms/base4-website-nextjs/hoc';
import { withLayout } from '@base-cms/base4-website-nextjs-bootstrap/layouts';
import {
  Name,
  Description,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/website-section';
import {
  Col,
  Row,
  Card,
  CardBody,
} from 'reactstrap';
import { BlockHeroA, BlockCardListGroupA, BlockListGroupA } from '@base-cms/base4-website-nextjs-bootstrap/website-scheduled-content';
import DefaultLayout from '../layouts/Default';
import PlaceholderAd from '../components/PlaceholderAd';


const SectionPage = ({ section }) => (
  <Wrapper section={section}>
    <Name section={section} />
    <Description tag="p" section={section} />
    <hr />
    <BlockHeroA
      query={{
        sectionId: section.id,
        first: 7,
        requiresImage: true,
      }}
    />
    <hr />
    <Row>
      <Col xs="4">
        <BlockCardListGroupA
          className="h-100"
          header="Products"
          query={{
            sectionId: section.id,
            first: 4,
            requiresImage: true,
            includeContentTypes: ['Product']
          }}
        />
      </Col>
      <Col xs="4">
        <Card className="h-100">
          <CardBody>
            <PlaceholderAd size="300x600" />
          </CardBody>
        </Card>
      </Col>
      <Col xs="4">
        <BlockListGroupA
          className="h-100"
          header="Latest"
          query={{
            sectionId: section.id,
            first: 5,
            requiresImage: true,
            excludeContentTypes: ['Company', 'Contact']
          }}
        />
      </Col>
    </Row>
    <hr />
    <Row>
      <Col xs="4">
        <BlockCardListGroupA
          className="h-100"
          header="Videos"
          query={{
            sectionId: section.id,
            first: 4,
            requiresImage: true,
            includeContentTypes: ['Video']
          }}
        />
      </Col>
      <Col xs="4">
        <BlockCardListGroupA
          className="h-100"
          header="Press Releases"
          query={{
            sectionId: section.id,
            first: 4,
            requiresImage: false,
            includeContentTypes: ['PressRelease']
          }}
        />
      </Col>
      <Col xs="4">

      </Col>
    </Row>
    <hr />
  </Wrapper>
);

export default withLayout(DefaultLayout)(
  withWebsiteSection()(
    SectionPage
  )
);
