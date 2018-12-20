'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-f7f9e949.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var router = require('next/router');
var core = require('@base-cms/nextjs-web/components/core');
var utils = require('@base-cms/nextjs-web/utils');

var _jsxFileName = "/base-cms/packages/nextjs-web-bootstrap/src/core/Card.jsx";
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
      attr = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "tag"]);

  return React__default.createElement(Tag, __chunk_1._extends({
    className: classNames('card', className)
  }, attr, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }), children);
};

Card.displayName = 'Core/Card';
Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

var _jsxFileName$1 = "/base-cms/packages/nextjs-web-bootstrap/src/core/CardBody.jsx";
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
  return React__default.createElement(Tag, {
    className: classNames(!overImage ? 'card-body' : 'card-img-overlay d-flex flex-column', className),
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 27
    },
    __self: this
  }, overImage ? React__default.createElement("div", {
    className: "mt-auto",
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 29
    },
    __self: this
  }, children) : children);
};

CardBody.displayName = 'Core/CardBody';
CardBody.propTypes = propTypes$1;
CardBody.defaultProps = defaultProps$1;

var _jsxFileName$2 = "/base-cms/packages/nextjs-web-bootstrap/src/core/ListGroup.jsx";
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
      rest = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "flush", "tag"]);

  return React__default.createElement(Tag, __chunk_1._extends({
    className: classNames('list-group', flush ? 'list-group-flush' : null, className)
  }, rest, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 28
    },
    __self: this
  }), children);
};

ListGroup.displayName = 'Core/ListGroup';
ListGroup.propTypes = propTypes$2;
ListGroup.defaultProps = defaultProps$2;

var _jsxFileName$3 = "/base-cms/packages/nextjs-web-bootstrap/src/core/ListGroupItem.jsx";
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
      attr = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "tag"]);

  return React__default.createElement(Tag, __chunk_1._extends({
    className: classNames('list-group-item', className)
  }, attr, {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 25
    },
    __self: this
  }), children);
};

ListGroupItem.displayName = 'Core/ListGroupItem';
ListGroupItem.propTypes = propTypes$3;
ListGroupItem.defaultProps = defaultProps$3;

var _jsxFileName$4 = "/base-cms/packages/nextjs-web-bootstrap/src/core/NavItem.jsx";
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
  }, attrs, {
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 46
    },
    __self: this
  }), React__default.createElement(core.LinkElement, __chunk_1._extends({
    to: to,
    className: classNames('navigation__link', 'nav-link', linkClassName),
    value: value
  }, linkAttrs, {
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 51
    },
    __self: this
  })));
};

NavItem.displayName = 'Core/NavItem';
NavItem.defaultProps = defaultProps$4;
NavItem.propTypes = propTypes$4;
var NavItem$1 = router.withRouter(NavItem);

var _jsxFileName$5 = "/base-cms/packages/nextjs-web-bootstrap/src/core/SiteNavbar.jsx";
var propTypes$5 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  className: PropTypes.string
};
var defaultProps$5 = {
  className: null
};

var SiteNavbar = function SiteNavbar(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return React__default.createElement(core.NavigationWrapper, {
    className: classNames('navigation navigation--site navbar', className),
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 16
    },
    __self: this
  }, children);
};

SiteNavbar.displayName = 'Core/SiteNavbar';
SiteNavbar.propTypes = propTypes$5;
SiteNavbar.defaultProps = defaultProps$5;

exports.Card = Card;
exports.CardBody = CardBody;
exports.ListGroup = ListGroup;
exports.ListGroupItem = ListGroupItem;
exports.NavItem = NavItem$1;
exports.SiteNavbar = SiteNavbar;
