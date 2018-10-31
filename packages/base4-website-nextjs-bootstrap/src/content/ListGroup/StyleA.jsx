import React from 'react';
import PropTypes from 'prop-types';
import { asArray } from '@base-cms/base4-website-nextjs/utils';

import { ListGroup } from '../../core';
import ListGroupItemA from '../ListGroupItem/StyleA';

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

const ListGroupStyleA = ({
  itemAttrs,
  nodes,
  ...attrs
}) => {
  const items = asArray(nodes);
  return items.length ? (
    <ListGroup {...attrs}>
      {items.map(content => (
        <ListGroupItemA key={content.id} content={content} {...itemAttrs} />
      ))}
    </ListGroup>
  ) : null;
};

ListGroupStyleA.displayName = 'Content/ListGroup/StyleA';
ListGroupStyleA.propTypes = propTypes;
ListGroupStyleA.defaultProps = defaultProps;
ListGroupStyleA.fragments = {
  content: ListGroupItemA.fragments.content,
};

export default ListGroupStyleA;
