import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { componentDisplayName } from '../utils';

export default (C, { modelType }) => {
  const WithModelFieldName = ({
    fieldName,
    className,
    ...rest
  }) => (
    <C className={classNames(`${modelType}__${fieldName}`, className)} {...rest} />
  );
  WithModelFieldName.displayName = `WithModelFieldName(${componentDisplayName(C)})[${modelType}]`;
  WithModelFieldName.propTypes = {
    ...C.propTypes,
    fieldName: PropTypes.string.isRequired,
  };
  return WithModelFieldName;
};
