import React from 'react';
import PropTypes from 'prop-types';
import Element from './Element';
import HTMLElement from './HTMLElement';
import { Link } from '../routing';

const propTypes = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsable: PropTypes.bool,
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
  collapsable: false,
  params: undefined,
  value: null,
};

const LinkElement = ({
  asHTML,
  children,
  collapsable,
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
    collapsable,
    href: isExternal ? href : undefined,
    tag: 'a',
    value,
  };
  const child = asHTML ? <HTMLElement {...props} /> : <Element {...props} />;
  if (isExternal) return child;
  return <Link route={href} params={params} passHref>{child}</Link>;
};

LinkElement.propTypes = propTypes;
LinkElement.defaultProps = defaultProps;

export default LinkElement;
