import React from 'react';
import PropTypes from 'prop-types';

import { createMarkup } from '../utils';

const propTypes = {
  collapsable: PropTypes.bool,
  tag: PropTypes.string,
  value: PropTypes.string,
};

const defaultProps = {
  collapsable: false,
  tag: 'div',
  value: '',
};

const HTML = ({
  collapsable,
  value,
  tag: Tag,
  ...attrs
}) => {
  if (!value && collapsable) return null;
  return <Tag dangerouslySetInnerHTML={createMarkup(value)} {...attrs} />;
};

HTML.propTypes = propTypes;
HTML.defaultProps = defaultProps;

export default HTML;
