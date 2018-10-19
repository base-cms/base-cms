import React from 'react';
import PropTypes from 'prop-types';
import HTML from './HTML';

const propTypes = {
  asHTML: PropTypes.bool,
  collapsable: PropTypes.bool,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  prop: PropTypes.string.isRequired,
  tag: PropTypes.string,
};

const defaultProps = {
  asHTML: false,
  collapsable: false,
  data: {},
  tag: 'div',
};

const FieldValue = ({
  asHTML,
  collapsable,
  data,
  prop,
  tag: Tag,
  ...attrs
}) => {
  const value = data && data[prop] ? data[prop] : null;
  if (asHTML) {
    return <HTML tag={Tag} value={value} collapsable={collapsable} {...attrs} />;
  }
  return !value && collapsable ? null : (
    <Tag {...attrs}>
      {value}
    </Tag>
  );
};

FieldValue.propTypes = propTypes;
FieldValue.defaultProps = defaultProps;

export default FieldValue;
