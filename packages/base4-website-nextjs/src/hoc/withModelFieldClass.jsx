import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { componentDisplayName, modelClassNames } from '../utils';

export default modelType => (Component) => {
  const WithModelFieldClass = ({
    path,
    className,
    ...rest
  }) => {
    const classes = modelClassNames(modelType, path);
    return <Component className={classNames(classes, className)} path={path} {...rest} />;
  };
  WithModelFieldClass.displayName = `WithModelFieldClass(${componentDisplayName(Component)})[${modelType}]`;
  WithModelFieldClass.propTypes = {
    ...Component.propTypes,
    path: PropTypes.string.isRequired,
  };
  return WithModelFieldClass;
};
