import React from 'react';
import gql from 'graphql-tag';
import { withPlatformContent } from '@base-cms/base4-website-nextjs/hoc';
import {
  Body,
  Name,
  PrimaryImage,
  PrimarySectionNameLink,
  PublishedDate,
  Row,
  Teaser,
  Type,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/content';
import withLayout from '../../../src/layouts/withLayout';
import DefaultLayout from '../layouts/Default';

// @todo Remove need for CDN!
const fragment = gql`
  fragment DefaultContentPage on PlatformContent {
    primaryImage {
      id
      src(input: { host: "cdn.officer.com" })
      alt
    }
  }
`;


const ContentPage = ({ content }) => (
  <Wrapper content={content}>
    <Name content={content} />
    <Teaser tag="h3" content={content} />
    <PrimaryImage content={content} />
    <hr />
    <Row>
      <PrimarySectionNameLink tag="span" content={content}>
        {(value) => <strong>{value}</strong>}
      </PrimarySectionNameLink>
      {' | '}
      <Type content={content} />
      {' | '}
      <PublishedDate prefix="Published " content={content} />
    </Row>
    <hr />
    <Body content={content} />
  </Wrapper>
);

export default withLayout(DefaultLayout)(
  withPlatformContent({ fragment })(
    ContentPage
  )
);

