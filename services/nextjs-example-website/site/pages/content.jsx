import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { withContent, withLayout } from '@base-cms/nextjs-web/hoc';
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
} from '@base-cms/nextjs-web/components/content';
import DefaultLayout from '../layouts/Default';

const fragment = gql`
  fragment DefaultContentPage on Content {
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
        {value => <strong>{value}</strong>}
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

ContentPage.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default withLayout(DefaultLayout)(
  withContent({ fragment })(
    ContentPage,
  ),
);
