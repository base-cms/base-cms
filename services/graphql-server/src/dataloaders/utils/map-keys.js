/* eslint-disable no-param-reassign */
/**
 * Takes an input of id+field keys and returns a map based on id.
 *
 * For example, given an input of:
  ```
  [
    [ 56203, [ '_id', 'alias' ] ],
    [ 56374, [ '_id', 'alias' ] ],
    [ 56211, [ '_id', 'alias' ] ],
    [ 56397, [ '_id', 'alias' ] ],
    [ 56212, [ '_id', 'alias' ] ],
    [ 56221, [ '_id', 'alias' ] ],
    [ 56174, [ '_id', 'alias' ] ],
  ]
  ```
 * Will return a map of:
  ```
  {
    '56174': { _id: 56174, set: Set { '_id', 'alias' } },
    '56203': { _id: 56203, set: Set { '_id', 'alias' } },
    '56211': { _id: 56211, set: Set { '_id', 'alias' } },
    '56212': { _id: 56212, set: Set { '_id', 'alias' } },
    '56221': { _id: 56221, set: Set { '_id', 'alias' } },
    '56374': { _id: 56374, set: Set { '_id', 'alias' } },
    '56397': { _id: 56397, set: Set { '_id', 'alias' } },
  }
  ```
 */
module.exports = keys => keys.reduce((o, [id, fields, query]) => {
  if (!o[id]) o[id] = { _id: id, set: new Set(), queries: [] };
  if (!fields) {
    o[id].set = null;
  } else if (o[id].set) {
    o[id].set = new Set([...fields, ...o[id].set]);
  }
  o[id].queries.push(query);
  return o;
}, {});
