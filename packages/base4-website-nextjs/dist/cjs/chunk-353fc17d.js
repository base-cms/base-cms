'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-9e05845b.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var utils = require('./utils.js');

var withModelFieldClass = (function (modelType) {
  return function (Component) {
    var WithModelFieldClass = function WithModelFieldClass(_ref) {
      var path = _ref.path,
          className = _ref.className,
          rest = __chunk_1._objectWithoutProperties(_ref, ["path", "className"]);

      var classes = utils.modelClassNames(modelType, path);
      return React__default.createElement(Component, __chunk_1._extends({
        className: classNames(classes, className),
        path: path
      }, rest));
    };

    WithModelFieldClass.displayName = "WithModelFieldClass(".concat(utils.componentDisplayName(Component), ")[").concat(modelType, "]");
    WithModelFieldClass.propTypes = __chunk_1._objectSpread({}, Component.propTypes, {
      path: PropTypes.string.isRequired
    });
    return WithModelFieldClass;
  };
});

exports.withModelFieldClass = withModelFieldClass;
