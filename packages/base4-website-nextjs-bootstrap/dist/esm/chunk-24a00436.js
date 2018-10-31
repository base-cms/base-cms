import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { a as _extends, b as _objectWithoutProperties } from './chunk-cfc9ba70.js';

var propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  overImage: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps = {
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
CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;

var propTypes$1 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  flush: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$1 = {
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
ListGroup.propTypes = propTypes$1;
ListGroup.defaultProps = defaultProps$1;

var propTypes$2 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$2 = {
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
ListGroupItem.propTypes = propTypes$2;
ListGroupItem.defaultProps = defaultProps$2;

export { CardBody as a, ListGroupItem as b, ListGroup as c };
