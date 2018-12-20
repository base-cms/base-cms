import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import ObjectValue from '../Elements/ObjectValue';
import Link from '../../website-section/Link';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  linkAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  prefix: null,
  tag: 'span',
};

const PrimarySectionNameLink = ({
  children,
  content,
  prefix,
  linkAttrs,
  ...attrs
}) => (
  <ObjectValue path="primarySection.name" obj={content} {...attrs}>
    {(value) => {
      const id = get(content, 'primarySection.id');
      const alias = get(content, 'primarySection.alias');
      if (!id || !alias) return null;
      return (
        <Link id={id} alias={alias} value={value} {...linkAttrs}>
          {children}
        </Link>
      );
    }}
  </ObjectValue>
);

PrimarySectionNameLink.propTypes = 'Content/Links/PrimarySectionName';
PrimarySectionNameLink.propTypes = propTypes;
PrimarySectionNameLink.defaultProps = defaultProps;

export default PrimarySectionNameLink;
