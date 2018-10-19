'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_2 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var utils = require('./utils.js');

var withModelFieldName = (function (C, _ref) {
  var modelType = _ref.modelType;

  var WithModelFieldName = function WithModelFieldName(_ref2) {
    var fieldName = _ref2.fieldName,
        className = _ref2.className,
        rest = __chunk_2._objectWithoutProperties(_ref2, ["fieldName", "className"]);

    return React__default.createElement(C, __chunk_2._extends({
      className: classNames("".concat(modelType, "__").concat(fieldName), className)
    }, rest));
  };

  WithModelFieldName.displayName = "WithModelFieldName(".concat(utils.componentDisplayName(C), ")[").concat(modelType, "]");
  WithModelFieldName.propTypes = __chunk_2._objectSpread({}, C.propTypes, {
    fieldName: PropTypes.string.isRequired
  });
  return WithModelFieldName;
});

exports.withModelFieldName = withModelFieldName;
