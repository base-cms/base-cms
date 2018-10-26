import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import FieldValue from '../Elements/FieldValue';
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
  sectionRoutePrefix: PropTypes.string,
  tag: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  sectionRoutePrefix: 'section',
  tag: 'span',
};

const ContentLinkPrimarySectionName = ({
  children,
  content,
  sectionRoutePrefix,
  linkAttrs,
  ...attrs
}) => (
  <FieldValue path="primarySection.name" data={content} {...attrs}>
    {(value) => {
      const id = get(content, 'primarySection.id');
      const alias = get(content, 'primarySection.alias');
      if (!id || !alias) return null;
      return (
        <Link routePrefix={sectionRoutePrefix} id={id} alias={alias} value={value} {...linkAttrs}>
          {children}
        </Link>
      );
    }}
  </FieldValue>
);

ContentLinkPrimarySectionName.propTypes = propTypes;
ContentLinkPrimarySectionName.defaultProps = defaultProps;

export default ContentLinkPrimarySectionName;
