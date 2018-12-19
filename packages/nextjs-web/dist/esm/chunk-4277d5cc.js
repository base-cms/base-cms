import { h as _objectSpread, j as _objectWithoutProperties, f as _extends } from './chunk-cc870ac4.js';
import React from 'react';
import { componentDisplayName, modelClassNames } from './utils.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var _jsxFileName = "/base-cms/packages/nextjs-web/src/hoc/withModelFieldClass.jsx";
var withModelFieldClass = (function (modelType) {
  return function (Component) {
    var WithModelFieldClass = function WithModelFieldClass(_ref) {
      var path = _ref.path,
          className = _ref.className,
          rest = _objectWithoutProperties(_ref, ["path", "className"]);

      var classes = modelClassNames(modelType, path);
      return React.createElement(Component, _extends({
        className: classNames(classes, className),
        path: path
      }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        },
        __self: this
      }));
    };

    WithModelFieldClass.displayName = "WithModelFieldClass(".concat(componentDisplayName(Component), ")[").concat(modelType, "]");
    WithModelFieldClass.propTypes = _objectSpread({}, Component.propTypes, {
      path: PropTypes.string.isRequired
    });
    return WithModelFieldClass;
  };
});

export { withModelFieldClass as a };
