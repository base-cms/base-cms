import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'next/router';
import { LinkElement } from '@base-cms/base4-website-nextjs/components/core';
import { escapeRegex, isFunction as isFn, cleanPath } from '@base-cms/base4-website-nextjs/utils';

const propTypes = {
  className: PropTypes.string,
  linkAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  linkClassName: PropTypes.string,
  match: PropTypes.func,
  router: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string,
  to: PropTypes.string.isRequired,
  value: PropTypes.string,
};

const defaultProps = {
  className: null,
  linkAttrs: {},
  linkClassName: null,
  match: (router, to) => {
    const { asPath } = router;
    const pattern = new RegExp(`^${escapeRegex(to)}`);
    return pattern.test(asPath);
  },
  tag: 'li',
  value: null,
};

const NavItem = ({
  className,
  linkAttrs,
  linkClassName,
  match,
  router,
  tag: Tag,
  to,
  value,
  ...attrs
}) => {
  let active = null;
  if (isFn(match) && match(router, to)) active = 'active';
  const { asPath, route } = router;
  return (
    <Tag
      data-route={cleanPath(route)}
      data-path={cleanPath(asPath)}
      className={classNames('navigation__item', 'nav-item', active, className)}
      {...attrs}
    >
      <LinkElement to={to} className={classNames('navigation__link', 'nav-link', linkClassName)} value={value} {...linkAttrs} />
    </Tag>
  );
};

NavItem.displayName = 'Navigation/NavItem';
NavItem.defaultProps = defaultProps;
NavItem.propTypes = propTypes;

export default withRouter(NavItem);
