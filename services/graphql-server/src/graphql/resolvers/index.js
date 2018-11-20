const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');
const { DateType, CursorType } = require('@limit0/graphql-custom-types');
const { ObjectIDType } = require('../types');


module.exports = deepAssign(
  {
    /**
     * Custom scalar types.
     */
    Date: DateType,
    Cursor: CursorType,
    JSON: GraphQLJSON,
    ObjectID: ObjectIDType,

    /**
     * Root queries.
     */
    Query: {
      /**
       *
       */
      ping: () => 'pong',
    },
  },
);
