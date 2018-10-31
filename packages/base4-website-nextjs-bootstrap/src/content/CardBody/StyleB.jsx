import React from 'react';
import PropTypes from 'prop-types';
import {
  CompanyNameLink,
  PrimarySectionNameLink,
  PublishedDate,
  Row,
  ShortNameLink,
} from '@base-cms/base4-website-nextjs/components/content';
import { CardBody } from '../../core';
import ContentCardImage from '../CardImage';
import wrapperAttrs from '../wrapper-attrs';
import fragment from './StyleB.graphql';

const propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string,
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string,
    }),
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
};

const defaultProps = {
  content: {},
};

const CardBodyStyleB = ({ content, ...attr }) => (
  <div {...wrapperAttrs({ modifier: 'card-body', content })}>
    <ContentCardImage content={content} />
    <CardBody {...attr}>
      <ShortNameLink content={content} tag="h4" />
      <CompanyNameLink content={content} tag="small" className="card-text d-block" prefix="From " />
      <Row tag="small" className="card-text">
        <PrimarySectionNameLink content={content} className="mr-2" />
        <PublishedDate content={content} />
      </Row>
    </CardBody>
  </div>
);

CardBodyStyleB.displayName = 'Content/CardBody/StyleB';
CardBodyStyleB.propTypes = propTypes;
CardBodyStyleB.defaultProps = defaultProps;
CardBodyStyleB.fragments = { content: fragment };

export default CardBodyStyleB;
