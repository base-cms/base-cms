import React from 'react';
import PropTypes from 'prop-types';
import {
  ShortNameLink,
} from '@base-cms/base4-website-nextjs/components/content';
import { CardBody } from '../../core';
import ContentCardImage from '../CardImage';
import wrapperAttrs from '../wrapper-attrs';
import fragment from './StyleC.graphql';

const propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
  imgAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  content: {},
  imgAttrs: {},
};

const CardBodyStyleC = ({
  content,
  imgAttrs,
  ...attrs
}) => (
  <div {...wrapperAttrs({ modifier: 'card-body', content })}>
    <ContentCardImage content={content} {...imgAttrs} />
    <CardBody {...attrs}>
      <ShortNameLink content={content} tag="h5" />
    </CardBody>
  </div>
);

CardBodyStyleC.displayName = 'Content/CardBody/StyleC';
CardBodyStyleC.propTypes = propTypes;
CardBodyStyleC.defaultProps = defaultProps;
CardBodyStyleC.fragments = { content: fragment };

export default CardBodyStyleC;
