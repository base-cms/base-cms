import React from 'react';
import { componentDisplayName } from '../utils';

export default (Link) => {
  const WithExternalLink = (props) => {
    const {
      route,
      to,
      children,
      ...rest
    } = props;
    const value = String(route || to || '');
    if (!value || !value.match(/^http/i)) {
      // Internal link.
      return <Link {...props} />;
    }
    // External link.
    return (
      <a href={value} {...rest}>
        {children}
      </a>
    );
  };

  WithExternalLink.displayName = `WithExternalLink(${componentDisplayName(Link)})`;
  return WithExternalLink;
};
