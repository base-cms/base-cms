import React from 'react';
import classNames from 'classnames';
import gql from 'graphql-tag';
import { withPlatformContent } from '@base-cms/base4-website-nextjs/hoc';
import { LinkElement } from '@base-cms/base4-website-nextjs/components/core';
import { ShortNameLink, FieldValue } from '@base-cms/base4-website-nextjs/components/content';

const fragment = gql`
  fragment ContentPageFragment on PlatformContent {
    shortName
  }
`;

const ContentPage = ({ content }) => (
  <article data-id={content.id} className={classNames('content', 'content--display', `content--${content.type}`)}>
    <FieldValue path="name" tag="h1" data={content} className="my-class" />
    <ShortNameLink content={content} />
    <FieldValue path="teaser" tag="h3" data={content} style={{ color: 'gray' }}>
      {(value) => {
        // Custom render.
        return <em>{value}</em>;
      }}
    </FieldValue>
    <FieldValue path="primarySection.name" tag="h4" data={content}>
      {(value) => {
        // With a generic link element.
        const to = `/section/${content.primarySection.alias}`;
        return <LinkElement className="section__link" to={to} value={`<em>${value}</em>`} asHTML />;
      }}
    </FieldValue>
    <hr />
    <FieldValue path="body" tag="div" data={content} asHTML />
  </article>
);

export default withPlatformContent({ fragment })(ContentPage);
