import React from 'react';
import PropTypes from 'prop-types';

import { createMarkup } from '../utils';

const HTML = ({
  className,
  collapsable,
  value,
  tag: Tag,
  ...attrs
}) => {
  if (!value && collapsable) return null;
  return <Tag className={className} dangerouslySetInnerHTML={createMarkup(value)} {...attrs} />;
};

HTML.propTypes = {
  className: PropTypes.string,
  collapsable: PropTypes.bool,
  tag: PropTypes.string,
  value: PropTypes.string,
};

HTML.defaultProps = {
  className: null,
  collapsable: true,
  tag: 'div',
  value: '',
};

export default HTML;
