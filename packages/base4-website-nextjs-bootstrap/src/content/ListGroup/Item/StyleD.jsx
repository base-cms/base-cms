import React from 'react';
import PropTypes from 'prop-types';
import {
  PrimarySectionNameLink,
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

const ListGroupItemStyleD = ({ content }) => (
  <ListGroupItem {...wrapperAttrs({ modifier: 'list-item', content })}>
    <PrimarySectionNameLink content={content} tag="small" />
    <ShortNameLink content={content} className="mb-0" />
  </ListGroupItem>
);

ListGroupItemStyleD.displayName = 'Content/ListGroup/Item/StyleD';
ListGroupItemStyleD.propTypes = propTypes;
ListGroupItemStyleD.defaultProps = defaultProps;

export default ListGroupItemStyleD;
