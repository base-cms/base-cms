'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-ef1c5e57.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var utils = require('./utils.js');
var routing = require('./routing.js');

var propTypes = {
  // additional arguments to send to the render function.
  args: PropTypes.array,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.node
};
var defaultProps = {
  args: [],
  children: function children(v) {
    return v;
  },
  collapsible: true,
  tag: 'div',
  value: null
};

var ValueElement = function ValueElement(_ref) {
  var args = _ref.args,
      children = _ref.children,
      collapsible = _ref.collapsible,
      Tag = _ref.tag,
      value = _ref.value,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["args", "children", "collapsible", "tag", "value"]);

  // Protect the child render function.
  var render = utils.isFunction(children) ? children : defaultProps.children; // Wrap the value with the element and return (if not collapsible).

  return !value && collapsible ? null : React__default.createElement(Tag, attrs, render.apply(void 0, [value].concat(__chunk_1._toConsumableArray(args))));
};

ValueElement.displayName = 'Core/Elements/Value';
ValueElement.propTypes = propTypes;
ValueElement.defaultProps = defaultProps;

var propTypes$1 = {
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.string
};
var defaultProps$1 = {
  collapsible: true,
  tag: 'div',
  value: ''
};

var HTMLElement = function HTMLElement(_ref) {
  var collapsible = _ref.collapsible,
      value = _ref.value,
      Tag = _ref.tag,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["collapsible", "value", "tag"]);

  if (!value && collapsible) return null;
  return React__default.createElement(Tag, __chunk_1._extends({
    dangerouslySetInnerHTML: utils.createMarkup(value)
  }, attrs));
};

HTMLElement.displayName = 'Core/Elements/HTML';
HTMLElement.propTypes = propTypes$1;
HTMLElement.defaultProps = defaultProps$1;

var propTypes$2 = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  // Route name or URL to match (per `next-routes`).
  to: PropTypes.string.isRequired,
  // The inner value to render by default.
  value: PropTypes.node
};
var defaultProps$2 = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  params: undefined,
  value: null
};

var LinkElement = function LinkElement(_ref) {
  var asHTML = _ref.asHTML,
      children = _ref.children,
      collapsible = _ref.collapsible,
      params = _ref.params,
      to = _ref.to,
      value = _ref.value,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["asHTML", "children", "collapsible", "params", "to", "value"]);

  var href = String(to || '');
  var isExternal = href.match(/^(http:|https:|ftp:|mailto:|\/\/)/i);

  var props = __chunk_1._objectSpread({}, attrs, {
    children: children,
    collapsible: collapsible,
    href: isExternal ? href : undefined,
    tag: 'a',
    value: value
  });

  var child = asHTML ? React__default.createElement(HTMLElement, props) : React__default.createElement(ValueElement, props);
  if (isExternal) return child;
  return React__default.createElement(routing.Link, {
    route: "/".concat(utils.cleanPath(href)),
    params: params,
    passHref: true
  }, child);
};

LinkElement.displayName = 'Core/Elements/Link';
LinkElement.propTypes = propTypes$2;
LinkElement.defaultProps = defaultProps$2;

exports.LinkElement = LinkElement;
exports.Value = ValueElement;
exports.HTML = HTMLElement;
