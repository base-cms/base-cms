import React from 'react';
import PropTypes from 'prop-types';
import Value from './Value';
import HTML from './HTML';
import { Link } from '../../../routing';
import { cleanPath } from '../../../utils';

const propTypes = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  // Route name or URL to match (per `next-routes`).
  to: PropTypes.string.isRequired,
  // The inner value to render by default.
  value: PropTypes.node,
};

const defaultProps = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  params: undefined,
  value: null,
};

const LinkElement = ({
  asHTML,
  children,
  collapsible,
  params,
  to,
  value,
  ...attrs
}) => {
  const href = String(to || '');
  const isExternal = href.match(/^(http:|https:|ftp:|mailto:|\/\/)/i);

  const props = {
    ...attrs,
    children,
    collapsible,
    href: isExternal ? href : undefined,
    tag: 'a',
    value,
  };
  const child = asHTML ? <HTML {...props} /> : <Value {...props} />;
  if (isExternal) return child;
  return <Link route={`/${cleanPath(href)}`} params={params} passHref>{child}</Link>;
};

LinkElement.displayName = 'Core/Elements/Link';
LinkElement.propTypes = propTypes;
LinkElement.defaultProps = defaultProps;

export default LinkElement;
