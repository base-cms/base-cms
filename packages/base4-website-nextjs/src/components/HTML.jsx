import React from 'react';
import PropTypes from 'prop-types';

import { createMarkup } from '../utils';

const HTML = ({
  className,
  collapsable,
  html,
  tag: Tag,
}) => {
  if (!html && collapsable) return null;
  return <Tag className={className} dangerouslySetInnerHTML={createMarkup(html)} />;
};

HTML.propTypes = {
  className: PropTypes.string,
  collapsable: PropTypes.bool,
  html: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

HTML.defaultProps = {
  className: null,
  collapsable: true,
  html: '',
  tag: 'div',
};

export default HTML;
