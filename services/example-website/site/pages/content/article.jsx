import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { withContent, withLayout } from '@base-cms/nextjs-web/hoc';
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
} from '@base-cms/nextjs-web/components/content';
import DefaultLayout from '../../layouts/Default';

const fragment = gql`
  fragment ContentArticlePage on Content {
    primaryImage {
      id
      src(input: { host: "cdn.officer.com" })
      alt
    }
    ... on Authorable {
      authors(input: { sort: { field: lastName }, pagination: { limit: 2 } }) {
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
  withContent({ fragment })(
    ContentArticlePage,
  ),
);
