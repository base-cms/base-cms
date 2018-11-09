import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { withPlatformContent } from '@base-cms/website-nextjs/hoc';
import { withLayout } from '@base-cms/website-nextjs-bootstrap/layouts';
import {
  Body,
  Name,
  PrimaryImage,
  PrimarySectionNameLink,
  PublishedDate,
  Row,
  Source,
  Teaser,
  Type,
  Wrapper,
} from '@base-cms/website-nextjs/components/content';
import DefaultLayout from '../../layouts/Default';

const fragment = gql`
  fragment ContentNewsPage on PlatformContent {
    shortName
    published
    primaryImage {
      id
      src(input: { host: "cdn.officer.com" })
      alt
    }
    ... on PlatformContentNews {
      source
    }
  }
`;

const ContentNewsPage = ({ content }) => (
  <Wrapper content={content}>
    <Name content={content} />
    <Teaser tag="h3" content={content} />
    <PrimaryImage content={content} />
    <hr />
    <Row>
      <PrimarySectionNameLink tag="span" content={content}>
        {value => <strong>{value}</strong>}
      </PrimarySectionNameLink>
      {' | '}
      <Type content={content} />
      {' | '}
      <PublishedDate prefix="Published " content={content} />
    </Row>
    <Source tag="div" content={content} />
    <hr />
    <Body content={content} />
  </Wrapper>
);

ContentNewsPage.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default withLayout(DefaultLayout)(
  withPlatformContent({ fragment })(
    ContentNewsPage,
  ),
);
