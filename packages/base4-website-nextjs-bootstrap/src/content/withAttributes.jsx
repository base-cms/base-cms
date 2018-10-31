import React from 'react';
import classNames from 'classnames';
import { componentDisplayName, getAsObject, get } from '@base-cms/base4-website-nextjs/utils';

export default modifier => (ComposedComponent) => {
  const WithContentAttributes = (props) => {
    const className = get(props, 'className');
    const content = getAsObject(props, 'content');
    const { id, type } = content;
    const attrs = {
      ...props,
      'data-id': id,
      className: classNames('content', `content--${modifier}`, `content--${type}`, className),
    };
    return <ComposedComponent {...attrs} />;
  };

  WithContentAttributes.displayName = `WithContentAttributes(${componentDisplayName(ComposedComponent)})`;
  return WithContentAttributes;
};
