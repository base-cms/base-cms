import { d as _objectSpread, a as _extends, b as _objectWithoutProperties } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { componentDisplayName } from './utils.js';

var withModelFieldName = (function (C, _ref) {
  var modelType = _ref.modelType;

  var WithModelFieldName = function WithModelFieldName(_ref2) {
    var fieldName = _ref2.fieldName,
        className = _ref2.className,
        rest = _objectWithoutProperties(_ref2, ["fieldName", "className"]);

    return React.createElement(C, _extends({
      className: classNames("".concat(modelType, "__").concat(fieldName), className)
    }, rest));
  };

  WithModelFieldName.displayName = "WithModelFieldName(".concat(componentDisplayName(C), ")[").concat(modelType, "]");
  WithModelFieldName.propTypes = _objectSpread({}, C.propTypes, {
    fieldName: PropTypes.string.isRequired
  });
  return WithModelFieldName;
});

export { withModelFieldName as a };
