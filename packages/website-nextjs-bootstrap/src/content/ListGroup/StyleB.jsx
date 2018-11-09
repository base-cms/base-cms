import React from 'react';
import PropTypes from 'prop-types';
import { asArray } from '@base-cms/base4-website-nextjs/utils';

import { ListGroup } from '../../core';
import ListGroupItemB from './Item/StyleB';
import fragment from './StyleB.graphql';

const propTypes = {
  flush: PropTypes.bool,
  itemAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  nodes: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  flush: false,
  itemAttrs: {},
  nodes: [],
};

const ListGroupStyleB = ({
  itemAttrs,
  nodes,
  ...attrs
}) => {
  const items = asArray(nodes);
  return items.length ? (
    <ListGroup {...attrs}>
      {items.map(content => (
        <ListGroupItemB key={content.id} content={content} {...itemAttrs} />
      ))}
    </ListGroup>
  ) : null;
};

ListGroupStyleB.displayName = 'Content/ListGroup/StyleB';
ListGroupStyleB.propTypes = propTypes;
ListGroupStyleB.defaultProps = defaultProps;
ListGroupStyleB.fragments = { content: fragment };

export default ListGroupStyleB;
