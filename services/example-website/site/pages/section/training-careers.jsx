import React from 'react';
import PropTypes from 'prop-types';
import { withWebsiteSection, withLayout } from '@base-cms/nextjs-web/hoc';
import {
  Wrapper,
} from '@base-cms/nextjs-web/components/website-section';
import { PlaceholderAd } from '@base-cms/nextjs-web/components/core';
import {
  Col,
  Row,
  Card,
  CardBody,
} from 'reactstrap';
import { BlockHeroA, BlockListGroupB } from '@base-cms/nextjs-web-bootstrap/website-scheduled-content';
import DefaultLayout from '../../layouts/Default';

const SectionPage = ({ section }) => (
  <Wrapper section={section}>
    <Row className="mb-3">
      <Col>
        <PlaceholderAd size="970x90" />
      </Col>
    </Row>
    <hr />
    <BlockHeroA
      query={{
        sectionId: section.id,
        limit: 7,
        requiresImage: true,
      }}
    />
    <hr />
    <Row>
      <Col xs="4">
        <BlockListGroupB
          className="h-100"
          header="Products"
          query={{
            sectionId: section.id,
            limit: 4,
            requiresImage: true,
            includeContentTypes: ['Product'],
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
        <BlockListGroupB
          className="h-100"
          header="Features"
          query={{
            sectionId: section.id,
            limit: 4,
            requiresImage: true,
            includeContentTypes: ['Article', 'Blog', 'MediaGallery'],
          }}
        />
      </Col>
    </Row>
    <hr />
    <Row>
      <Col xs="4">
        <BlockListGroupB
          className="h-100"
          header="News"
          query={{
            sectionId: section.id,
            limit: 4,
            requiresImage: true,
            includeContentTypes: ['News', 'PressRelease'],
          }}
        />
      </Col>
      <Col xs="4">
        <BlockListGroupB
          className="h-100"
          header="Video"
          query={{
            sectionId: section.id,
            limit: 4,
            requiresImage: true,
            includeContentTypes: ['Video'],
          }}
        />
      </Col>
      <Col xs="4" />
    </Row>
    <hr />
  </Wrapper>
);

SectionPage.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default withLayout(DefaultLayout)(
  withWebsiteSection()(
    SectionPage,
  ),
);
