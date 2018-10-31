import { a as _extends, b as _objectWithoutProperties } from './chunk-2f5ab1ea.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'next/router';
import { LinkElement, NavigationWrapper } from '@base-cms/base4-website-nextjs/components/core';
import { escapeRegex, isFunction, cleanPath } from '@base-cms/base4-website-nextjs/utils';
import { SiteConfigContext } from '@base-cms/base4-website-nextjs/config';
import { b as ListGroup, a as ListGroupItem } from './chunk-1b8d0d36.js';
export { b as ListGroup, a as ListGroupItem } from './chunk-1b8d0d36.js';

var propTypes = {
  className: PropTypes.string,
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  linkClassName: PropTypes.string,
  match: PropTypes.func,
  router: PropTypes.object.isRequired,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string,
  to: PropTypes.string.isRequired,
  value: PropTypes.string
};
var defaultProps = {
  className: null,
  linkAttrs: {},
  linkClassName: null,
  match: function match(router, to) {
    var asPath = router.asPath;
    var pattern = new RegExp("^".concat(escapeRegex(to)));
    return pattern.test(asPath);
  },
  tag: 'li',
  value: null
};

var NavItem = function NavItem(_ref) {
  var className = _ref.className,
      linkAttrs = _ref.linkAttrs,
      linkClassName = _ref.linkClassName,
      match = _ref.match,
      router = _ref.router,
      Tag = _ref.tag,
      to = _ref.to,
      value = _ref.value,
      attrs = _objectWithoutProperties(_ref, ["className", "linkAttrs", "linkClassName", "match", "router", "tag", "to", "value"]);

  var active = null;
  if (isFunction(match) && match(router, to)) active = 'active';
  return React.createElement(Tag, _extends({
    "data-to": cleanPath(to),
    className: classNames('navigation__item', 'nav-item', active, className)
  }, attrs), React.createElement(LinkElement, _extends({
    to: to,
    className: classNames('navigation__link', 'nav-link', linkClassName),
    value: value
  }, linkAttrs)));
};

NavItem.displayName = 'Navigation/NavItem';
NavItem.defaultProps = defaultProps;
NavItem.propTypes = propTypes;
var NavItem$1 = withRouter(NavItem);

var propTypes$1 = {
  logoHeight: PropTypes.number
};
var defaultProps$1 = {
  logoHeight: 25
};

var SiteNavbar = function SiteNavbar(_ref) {
  var logoHeight = _ref.logoHeight;
  return React.createElement(NavigationWrapper, {
    className: "navigation navigation--site navbar navbar-dark navbar-expand bg-dark"
  }, React.createElement(SiteConfigContext.Consumer, null, function (config) {
    return React.createElement("div", {
      className: "d-flex flex-column"
    }, React.createElement("div", {
      className: "d-flex flex-row"
    }, React.createElement(LinkElement, {
      to: "/",
      className: "navbar-brand ml-2",
      value: config.get('name')
    }, function (value) {
      var siteLogo = config.get('logo');

      if (siteLogo) {
        return React.createElement("img", {
          src: siteLogo,
          title: value,
          alt: value,
          height: logoHeight
        });
      }

      return value;
    }), React.createElement("ul", {
      className: "navbar-nav small align-self-center"
    }, config.getAsArray('secondaryNavItems').map(function (item) {
      return React.createElement(NavItem$1, {
        key: item.to,
        to: item.to,
        value: item.label
      });
    }))), React.createElement("ul", {
      className: "navbar-nav"
    }, config.getAsArray('primaryNavItems').map(function (item) {
      return React.createElement(NavItem$1, {
        key: item.to,
        to: item.to,
        value: item.label
      });
    })));
  }));
};

SiteNavbar.propTypes = propTypes$1;
SiteNavbar.defaultProps = defaultProps$1;

export { NavItem$1 as NavItem, SiteNavbar };
