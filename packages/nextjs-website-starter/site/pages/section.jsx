import React from 'react';
import { withWebsiteSection } from '@base-cms/base4-website-nextjs/hoc';
import { withLayout } from '@base-cms/base4-website-nextjs-bootstrap/layouts';
import {
  Name,
  Description,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/website-section';
import { BlockListGroupA } from '@base-cms/base4-website-nextjs-bootstrap/website-scheduled-content';
import {
  Row,
  Col,
} from 'reactstrap';
import DefaultLayout from '../layouts/Default';

const SectionPage = ({ section }) => (
  <Wrapper section={section}>
    <Name section={section} />
    <Description tag="p" section={section} />
    <hr />
    <Row>
      <Col xs="8" />
      <Col xs="4">
        <BlockListGroupA
          query={{
            sectionId: section.id,
            first: 7,
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
