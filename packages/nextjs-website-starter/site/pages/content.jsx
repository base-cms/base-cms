import React from 'react';
import classNames from 'classnames';
import { withPlatformContent } from '@base-cms/base4-website-nextjs/hoc';
import { ContentFieldValue as FieldValue } from '@base-cms/base4-website-nextjs/components';

const ContentPage = ({ content }) => (
  <article data-id={content.id} className={classNames('content', 'content--display', `content--${content.type}`)}>
    <FieldValue prop="name" tag="h1" data={content} className="my-class" />
    <FieldValue prop="teaser" tag="h3" data={content} style={{ color: 'gray' }}>
      {(value) => {
        // Custom render.
        return <em>{value}</em>;
      }}
    </FieldValue>
    <hr />
    <FieldValue prop="body" tag="div" data={content} asHTML />
  </article>
);

export default withPlatformContent(ContentPage);
