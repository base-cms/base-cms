const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');
const { DateType, CursorType } = require('@limit0/graphql-custom-types');

module.exports = deepAssign(
  {
    /**
     * Custom scalar types.
     */
    Date: DateType,
    Cursor: CursorType,
    JSON: GraphQLJSON,

    /**
     * Root queries.
     */
    Query: {
      /**
       *
       */
      ping: (_, input, { tenant }) => tenant || 'pong',
    },
  },
);
