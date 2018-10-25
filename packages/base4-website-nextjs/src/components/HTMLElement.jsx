import React from 'react';
import PropTypes from 'prop-types';

import { createMarkup } from '../utils';

const propTypes = {
  collapsable: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.string,
};

const defaultProps = {
  collapsable: false,
  tag: 'div',
  value: '',
};

const HTMLElement = ({
  collapsable,
  value,
  tag: Tag,
  ...attrs
}) => {
  if (!value && collapsable) return null;
  return <Tag dangerouslySetInnerHTML={createMarkup(value)} {...attrs} />;
};

HTMLElement.propTypes = propTypes;
HTMLElement.defaultProps = defaultProps;

export default HTMLElement;
