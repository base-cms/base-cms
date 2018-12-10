/* eslint-disable no-param-reassign */

const { keys } = Object;

/**
 * Takes a map of `_id` and field sets and returns a query map
 * based on the projection.
 *
 * For example, given an input of:
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
 * Will return a new map of:
  ```
  {
    '_id|alias': {
      ids: [ 56174, 56203, 56211, 56212, 56221, 56374, 56397 ],
      projection: { _id: 1, alias: 1 }
    }
  }
  ```
 */
module.exports = map => keys(map).reduce((o, id) => {
  const { _id, set, queries } = map[id];
  const fields = set ? [...set] : [];
  const key = fields.join('|');
  const projection = fields.reduce((p, name) => ({ ...p, [name]: 1 }), {});
  if (!o[key]) o[key] = { ids: [], projection, queries };
  o[key].ids.push(_id);
  return o;
}, {});
