import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  flush: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps = {
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
ListGroup.propTypes = propTypes;
ListGroup.defaultProps = defaultProps;

var propTypes$1 = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$1 = {
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
ListGroupItem.propTypes = propTypes$1;
ListGroupItem.defaultProps = defaultProps$1;

export { _extends as a, _objectWithoutProperties as b, ListGroupItem as c, _taggedTemplateLiteral as d, ListGroup as e, _objectSpread as f };
