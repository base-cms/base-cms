'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_2 = require('./chunk-5dc5312d.js');
var utils = require('./utils.js');

var propTypes = {
  // The website section alias.
  alias: PropTypes.string.isRequired,
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  // The route prefix to prepend to the alias.
  routePrefix: PropTypes.string,
  // The inner value to render by default.
  value: PropTypes.node
};
var defaultProps = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  params: undefined,
  routePrefix: 'section',
  value: null
}; // @todo Do not make this clickable if the canonicalPath matches the route.

var WebsiteSectionLink = function WebsiteSectionLink(_ref) {
  var alias = _ref.alias,
      routePrefix = _ref.routePrefix,
      rest = __chunk_1._objectWithoutProperties(_ref, ["alias", "routePrefix"]);

  var to = routePrefix ? "".concat(routePrefix, "/").concat(utils.cleanPath(alias)) : alias;
  return React__default.createElement(__chunk_2.LinkElement, __chunk_1._extends({
    to: to,
    className: "website-section__link"
  }, rest));
};

WebsiteSectionLink.propTypes = propTypes;
WebsiteSectionLink.defaultProps = defaultProps;

exports.Link = WebsiteSectionLink;
