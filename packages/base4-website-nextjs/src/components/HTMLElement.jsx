import React from 'react';
import PropTypes from 'prop-types';

import { createMarkup } from '../utils';

const propTypes = {
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.string,
};

const defaultProps = {
  collapsible: false,
  tag: 'div',
  value: '',
};

const HTMLElement = ({
  collapsible,
  value,
  tag: Tag,
  ...attrs
}) => {
  if (!value && collapsible) return null;
  return <Tag dangerouslySetInnerHTML={createMarkup(value)} {...attrs} />;
};

HTMLElement.propTypes = propTypes;
HTMLElement.defaultProps = defaultProps;

export default HTMLElement;
