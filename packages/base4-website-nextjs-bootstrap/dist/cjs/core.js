'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-3874e52a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var router = require('next/router');
var core = require('@base-cms/base4-website-nextjs/components/core');
var utils = require('@base-cms/base4-website-nextjs/utils');
var config = require('@base-cms/base4-website-nextjs/config');
var __chunk_2 = require('./chunk-ec0103f6.js');

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
  match: function match(router$$1, to) {
    var asPath = router$$1.asPath;
    var pattern = new RegExp("^".concat(utils.escapeRegex(to)));
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
      router$$1 = _ref.router,
      Tag = _ref.tag,
      to = _ref.to,
      value = _ref.value,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["className", "linkAttrs", "linkClassName", "match", "router", "tag", "to", "value"]);

  var active = null;
  if (utils.isFunction(match) && match(router$$1, to)) active = 'active';
  return React__default.createElement(Tag, __chunk_1._extends({
    "data-to": utils.cleanPath(to),
    className: classNames('navigation__item', 'nav-item', active, className)
  }, attrs), React__default.createElement(core.LinkElement, __chunk_1._extends({
    to: to,
    className: classNames('navigation__link', 'nav-link', linkClassName),
    value: value
  }, linkAttrs)));
};

NavItem.displayName = 'Navigation/NavItem';
NavItem.defaultProps = defaultProps;
NavItem.propTypes = propTypes;
var NavItem$1 = router.withRouter(NavItem);

var propTypes$1 = {
  logoHeight: PropTypes.number
};
var defaultProps$1 = {
  logoHeight: 25
};

var SiteNavbar = function SiteNavbar(_ref) {
  var logoHeight = _ref.logoHeight;
  return React__default.createElement(core.NavigationWrapper, {
    className: "navigation navigation--site navbar navbar-dark navbar-expand bg-dark"
  }, React__default.createElement(config.SiteConfigContext.Consumer, null, function (config$$1) {
    return React__default.createElement("div", {
      className: "d-flex flex-column"
    }, React__default.createElement("div", {
      className: "d-flex flex-row"
    }, React__default.createElement(core.LinkElement, {
      to: "/",
      className: "navbar-brand ml-2",
      value: config$$1.get('name')
    }, function (value) {
      var siteLogo = config$$1.get('logo');

      if (siteLogo) {
        return React__default.createElement("img", {
          src: siteLogo,
          title: value,
          alt: value,
          height: logoHeight
        });
      }

      return value;
    }), React__default.createElement("div", {
      className: "navbar-nav small align-self-center"
    }, config$$1.getAsArray('secondaryNavItems').map(function (item) {
      return React__default.createElement(NavItem$1, {
        key: item.to,
        to: item.to,
        value: item.label
      });
    }))), React__default.createElement("div", {
      className: "navbar-nav"
    }, config$$1.getAsArray('primaryNavItems').map(function (item) {
      return React__default.createElement(NavItem$1, {
        key: item.to,
        to: item.to,
        value: item.label
      });
    })));
  }));
};

SiteNavbar.propTypes = propTypes$1;
SiteNavbar.defaultProps = defaultProps$1;

exports.ListGroup = __chunk_2.ListGroup;
exports.ListGroupItem = __chunk_2.ListGroupItem;
exports.NavItem = NavItem$1;
exports.SiteNavbar = SiteNavbar;
