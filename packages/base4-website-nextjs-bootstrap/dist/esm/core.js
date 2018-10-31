import { a as _extends, b as _objectWithoutProperties } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'next/router';
import { LinkElement, NavigationWrapper } from '@base-cms/base4-website-nextjs/components/core';
import { escapeRegex, isFunction, cleanPath } from '@base-cms/base4-website-nextjs/utils';
import { SiteConfigContext } from '@base-cms/base4-website-nextjs/config';

var propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps = {
  className: null,
  tag: 'div'
};

var Card = function Card(_ref) {
  var children = _ref.children,
      className = _ref.className,
      Tag = _ref.tag,
      attr = _objectWithoutProperties(_ref, ["children", "className", "tag"]);

  return React.createElement(Tag, _extends({
    className: classNames('card', className)
  }, attr), children);
};

Card.displayName = 'Core/Card';
Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

var propTypes$1 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  overImage: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$1 = {
  className: null,
  overImage: false,
  tag: 'div'
};

var CardBody = function CardBody(_ref) {
  var children = _ref.children,
      className = _ref.className,
      overImage = _ref.overImage,
      Tag = _ref.tag;
  return React.createElement(Tag, {
    className: classNames(!overImage ? 'card-body' : 'card-img-overlay d-flex flex-column', className)
  }, overImage ? React.createElement("div", {
    className: "mt-auto"
  }, children) : children);
};

CardBody.displayName = 'CardBody';
CardBody.propTypes = propTypes$1;
CardBody.defaultProps = defaultProps$1;

var propTypes$2 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  flush: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$2 = {
  className: null,
  flush: false,
  tag: 'ul'
};

var ListGroup = function ListGroup(_ref) {
  var children = _ref.children,
      className = _ref.className,
      flush = _ref.flush,
      Tag = _ref.tag,
      rest = _objectWithoutProperties(_ref, ["children", "className", "flush", "tag"]);

  return React.createElement(Tag, _extends({
    className: classNames('list-group', flush ? 'list-group-flush' : null, className)
  }, rest), children);
};

ListGroup.displayName = 'Core/ListGroup';
ListGroup.propTypes = propTypes$2;
ListGroup.defaultProps = defaultProps$2;

var propTypes$3 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$3 = {
  className: null,
  tag: 'li'
};

var ListGroupItem = function ListGroupItem(_ref) {
  var children = _ref.children,
      className = _ref.className,
      Tag = _ref.tag,
      attr = _objectWithoutProperties(_ref, ["children", "className", "tag"]);

  return React.createElement(Tag, _extends({
    className: classNames('list-group-item', className)
  }, attr), children);
};

ListGroupItem.displayName = 'Core/ListGroupItem';
ListGroupItem.propTypes = propTypes$3;
ListGroupItem.defaultProps = defaultProps$3;

var propTypes$4 = {
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
var defaultProps$4 = {
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
NavItem.defaultProps = defaultProps$4;
NavItem.propTypes = propTypes$4;
var NavItem$1 = withRouter(NavItem);

var propTypes$5 = {
  className: PropTypes.string,
  logoHeight: PropTypes.number
};
var defaultProps$5 = {
  className: null,
  logoHeight: 25
};

var SiteNavbar = function SiteNavbar(_ref) {
  var className = _ref.className,
      logoHeight = _ref.logoHeight;
  return React.createElement(NavigationWrapper, {
    className: classNames('navigation navigation--site navbar navbar-expand', className)
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

SiteNavbar.propTypes = propTypes$5;
SiteNavbar.defaultProps = defaultProps$5;

export { Card, CardBody, ListGroup, ListGroupItem, NavItem$1 as NavItem, SiteNavbar };
