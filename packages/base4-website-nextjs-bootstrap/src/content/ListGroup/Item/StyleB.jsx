import React from 'react';
import PropTypes from 'prop-types';
import {
  CompanyNameLink,
  PrimaryImageLink,
  PrimarySectionNameLink,
  PublishedDate,
  ShortNameLink,
} from '@base-cms/base4-website-nextjs/components/content';
import ListGroupItem from '../../../core/ListGroupItem';
import wrapperAttrs from '../../wrapper-attrs';

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

const ListGroupItemStyleB = ({ content }) => (
  <ListGroupItem {...wrapperAttrs({ modifier: 'list-item', content })}>

    <div className="row">
      <div className="col-4 pr-0">
        <PrimaryImageLink content={content} imgAttrs={{ className: 'img-fluid' }} />
      </div>
      <div className="col-8">
        <ShortNameLink content={content} className="mb-1" />
        <CompanyNameLink content={content} tag="small" className="d-block" prefix="From " />
        <PrimarySectionNameLink content={content} tag="small" className="d-block" />
        <PublishedDate content={content} tag="small" className="d-block" />
      </div>
    </div>
  </ListGroupItem>
);

ListGroupItemStyleB.displayName = 'Content/ListGroup/Item/StyleB';
ListGroupItemStyleB.propTypes = propTypes;
ListGroupItemStyleB.defaultProps = defaultProps;

export default ListGroupItemStyleB;
