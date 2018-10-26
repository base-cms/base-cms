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

const ContentLinkPrimarySection = ({
  children,
  content,
  sectionRoutePrefix,
  linkAttrs,
  ...attrs
}) => (
  <FieldValue path="primarySection.name" data={content} {...attrs}>
    {(value) => {
      const alias = get(content, 'primarySection.alias');
      if (!alias) return null;
      return (
        <Link routePrefix={sectionRoutePrefix} alias={alias} value={value} {...linkAttrs}>
          {children}
        </Link>
      );
    }}
  </FieldValue>
);

ContentLinkPrimarySection.propTypes = propTypes;
ContentLinkPrimarySection.defaultProps = defaultProps;

export default ContentLinkPrimarySection;
