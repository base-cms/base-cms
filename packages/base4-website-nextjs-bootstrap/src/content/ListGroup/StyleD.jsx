import React from 'react';
import PropTypes from 'prop-types';
import { asArray } from '@base-cms/base4-website-nextjs/utils';

import { ListGroup } from '../../core';
import ListGroupItemD from './Item/StyleD';
import fragment from './StyleD.graphql';

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

const ListGroupStyleD = ({
  itemAttrs,
  nodes,
  ...attrs
}) => {
  const items = asArray(nodes);
  return items.length ? (
    <ListGroup {...attrs}>
      {items.map(content => (
        <ListGroupItemD key={content.id} content={content} {...itemAttrs} />
      ))}
    </ListGroup>
  ) : null;
};

ListGroupStyleD.displayName = 'Content/ListGroup/StyleD';
ListGroupStyleD.propTypes = propTypes;
ListGroupStyleD.defaultProps = defaultProps;
ListGroupStyleD.fragments = { content: fragment };

export default ListGroupStyleD;
