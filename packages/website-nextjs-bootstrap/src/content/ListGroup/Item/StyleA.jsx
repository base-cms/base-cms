import React from 'react';
import PropTypes from 'prop-types';
import {
  CompanyNameLink,
  PrimarySectionNameLink,
  PublishedDate,
  Row,
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
  }),
};

const defaultProps = {
  content: {},
};

const ListGroupItemStyleA = ({ content }) => (
  <ListGroupItem {...wrapperAttrs({ modifier: 'list-item', content })}>
    <ShortNameLink content={content} className="mb-1" />
    <CompanyNameLink content={content} tag="small" className="d-block" prefix="From " />
    <Row tag="small">
      <PrimarySectionNameLink content={content} className="mr-2" />
      <PublishedDate content={content} />
    </Row>
  </ListGroupItem>
);

ListGroupItemStyleA.displayName = 'Content/ListGroup/Item/StyleA';
ListGroupItemStyleA.propTypes = propTypes;
ListGroupItemStyleA.defaultProps = defaultProps;

export default ListGroupItemStyleA;
