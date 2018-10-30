import React from 'react';
import gql from 'graphql-tag';
import { withPlatformContent } from '@base-cms/base4-website-nextjs/hoc';
import { DefaultLayout, withLayout } from '@base-cms/base4-website-nextjs-bootstrap/layouts';
import {
  AuthorFullNameLinks,
  Body,
  Name,
  PrimarySectionNameLink,
  PublishedDate,
  Row,
  Teaser,
  Type,
  Wrapper,
} from '@base-cms/base4-website-nextjs/components/content';

const fragment = gql`
  fragment ContentArticlePage on PlatformContent {
    ... on PlatformContentArticle {
			authors(input: { sort: { field: lastName }, pagination: { first: 2 } }) {
				edges {
					node {
						id
						fullName
						canonicalPath(input: { fields: $canonicalFields })
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
    <hr />
    <Body content={content} />
  </Wrapper>
);

export default withLayout(DefaultLayout)(
  withPlatformContent({ fragment })(
    ContentArticlePage
  )
);
