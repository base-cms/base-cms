import React from 'react';
import PropTypes from 'prop-types';
import { withWebsiteSection, withLayout } from '@base-cms/nextjs-web/hoc';
import {
  Name,
  Description,
  Wrapper,
} from '@base-cms/nextjs-web/components/website-section';
import { PlaceholderAd } from '@base-cms/nextjs-web/components/core';
import {
  Col,
  Row,
} from 'reactstrap';
import { BlockCardDeckA } from '@base-cms/nextjs-web-bootstrap/website-scheduled-content';
import DefaultLayout from '../layouts/Default';

const SectionPage = ({ section }) => (
  <Wrapper section={section}>
    <Row className="mb-3">
      <Col>
        <PlaceholderAd size="970x90" />
      </Col>
    </Row>
    <Name section={section} />
    <Description tag="p" section={section} />
    <hr />
    <BlockCardDeckA
      query={{
        sectionId: section.id,
        limit: 17,
        requiresImage: true,
        includeContentTypes: ['Video'],
      }}
      interstitial={() => <PlaceholderAd size="300x250" />}
    />
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
