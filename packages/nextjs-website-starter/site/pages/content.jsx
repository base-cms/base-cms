import React from 'react';
import gql from 'graphql-tag';
import { withPlatformContent } from '@base-cms/base4-website-nextjs/hoc';
import {
  AuthorFullNameLinks,
  Body,
  Name,
  PrimarySectionNameLink,
  PublishedDate,
  Row,
  Source,
  Teaser,
  Type,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/content';

const fragment = gql`
  fragment ContentPageFragment on PlatformContent {
    shortName
    published
    ... on PlatformContentNews {
      source
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

const ContentPage = ({ content }) => (
  <Wrapper content={content}>
    <Name content={content} />
    <Teaser tag="h3" content={content} />
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
    <AuthorFullNameLinks prefix="By " content={content} />
    <Source tag="div" content={content} />
    <hr />
    <Body content={content} />
  </Wrapper>
);

export default withPlatformContent({ fragment })(ContentPage);
