import React from 'react';
import classNames from 'classnames';
import { withPlatformContent } from '@base-cms/base4-website-nextjs/hoc';
import { ContentField } from '@base-cms/base4-website-nextjs/components';

const ContentPage = ({ content }) => (
  <article data-id={content.id} className={classNames('content', 'content--display', `content--${content.type}`)}>
    <ContentField tag="h1" fieldName="name">
      {content.name}
    </ContentField>
    <ContentField tag="h3" fieldName="teaser">
      {content.teaser}
    </ContentField>
    <hr />
    <ContentField tag="div" fieldName="body" asHTML>
      {content.body}
    </ContentField>
  </article>
);

export default withPlatformContent(ContentPage);
