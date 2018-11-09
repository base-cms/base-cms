import React from 'react';
import PropTypes from 'prop-types';
import { asArray } from '@base-cms/base4-website-nextjs/utils';

import { ListGroup } from '../../core';
import ListGroupItemC from './Item/StyleC';
import fragment from './StyleC.graphql';

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

const ListGroupStyleC = ({
  itemAttrs,
  nodes,
  ...attrs
}) => {
  const items = asArray(nodes);
  return items.length ? (
    <ListGroup {...attrs}>
      {items.map(content => (
        <ListGroupItemC key={content.id} content={content} {...itemAttrs} />
      ))}
    </ListGroup>
  ) : null;
};

ListGroupStyleC.displayName = 'Content/ListGroup/StyleC';
ListGroupStyleC.propTypes = propTypes;
ListGroupStyleC.defaultProps = defaultProps;
ListGroupStyleC.fragments = { content: fragment };

export default ListGroupStyleC;
