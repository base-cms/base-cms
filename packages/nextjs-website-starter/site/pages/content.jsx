import React from 'react';
import classNames from 'classnames';
import gql from 'graphql-tag';
import { withPlatformContent } from '@base-cms/base4-website-nextjs/hoc';
import { LinkElement } from '@base-cms/base4-website-nextjs/components/core';
import {
  Body,
  FieldValue,
  Name,
  PublishedDate,
  ShortNameLink,
  Row,
  Teaser,
  Type,
} from '@base-cms/base4-website-nextjs/components/content';

const fragment = gql`
  fragment ContentPageFragment on PlatformContent {
    shortName
    published
  }
`;

const ContentPage = ({ content }) => (
  <article data-id={content.id} className={classNames('content', 'content--display', `content--${content.type}`)}>
    <Name content={content} />
    <ShortNameLink content={content} />
    <Teaser tag="h3" content={content} />
    <FieldValue path="primarySection.name" tag="h4" data={content}>
      {(value) => {
        // With a generic link element.
        const to = `/section/${content.primarySection.alias}`;
        return <LinkElement className="section__link" to={to} value={`<em>${value}</em>`} asHTML />;
      }}
    </FieldValue>
    <hr />
    <Row>
      <Type content={content}>
        {(value) => <>Type: {value}</>}
      </Type>
      {' | '}
      <PublishedDate prefix="Published: " content={content} />
    </Row>
    <hr />
    <Body content={content} />
  </article>
);

export default withPlatformContent({ fragment })(ContentPage);
