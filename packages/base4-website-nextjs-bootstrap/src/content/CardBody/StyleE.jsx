import React from 'react';
import PropTypes from 'prop-types';
import {
  AuthorFullNameLinks,
  CompanyNameLink,
  PrimarySectionNameLink,
  PublishedDate,
  Row,
  ShortNameLink,
  Teaser,
} from '@base-cms/base4-website-nextjs/components/content';
import { CardBody } from '../../core';
import ContentCardImage from '../CardImage';
import wrapperAttrs from '../wrapper-attrs';
import fragment from './StyleE.graphql';

const propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    teaser: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    authors: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.number,
          fullName: PropTypes.string,
          canonicalPath: PropTypes.string,
        }),
      })),
    }),
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
  imgAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  content: {},
  imgAttrs: {},
};

const CardBodyStyleE = ({
  content,
  imgAttrs,
  ...attrs
}) => (
  <div {...wrapperAttrs({ modifier: 'card-body', content })}>
    <ContentCardImage withBody content={content} {...imgAttrs} />
    <CardBody overImage {...attrs}>
      <ShortNameLink content={content} tag="h4" />
      <CompanyNameLink content={content} tag="small" className="card-text d-block" prefix="From " />
      <Teaser content={content} className="card-text" />
      <Row tag="small" className="card-text">
        <PrimarySectionNameLink content={content} className="mr-2" />
        <AuthorFullNameLinks content={content} className="mr-2 d-inline-block" />
        <PublishedDate content={content} />
      </Row>
    </CardBody>
  </div>
);

CardBodyStyleE.displayName = 'Content/CardBody/StyleE';
CardBodyStyleE.propTypes = propTypes;
CardBodyStyleE.defaultProps = defaultProps;
CardBodyStyleE.fragments = { content: fragment };

export default CardBodyStyleE;
