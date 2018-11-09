import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { withPlatformContent } from '@base-cms/website-nextjs/hoc';
import { withLayout } from '@base-cms/website-nextjs-bootstrap/layouts';
import {
  AuthorFullNameLinks,
  Body,
  Name,
  PrimaryImage,
  PrimarySectionNameLink,
  PublishedDate,
  Row,
  Teaser,
  Type,
  Wrapper,
} from '@base-cms/website-nextjs/components/content';
import DefaultLayout from '../../layouts/Default';

const fragment = gql`
  fragment ContentArticlePage on PlatformContent {
    primaryImage {
      id
      src(input: { host: "cdn.officer.com" })
      alt
    }
    ... on PlatformContentArticle {
      authors(input: { sort: { field: lastName }, pagination: { first: 2 } }) {
        edges {
          node {
            id
            fullName
            canonicalPath
          }
        }
      }
    }
  }
`;

const ContentArticlePage = ({ content }) => (
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
    <AuthorFullNameLinks prefix="By " content={content} />
    <hr />
    <Body content={content} />
  </Wrapper>
);

ContentArticlePage.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default withLayout(DefaultLayout)(
  withPlatformContent({ fragment })(
    ContentArticlePage,
  ),
);
