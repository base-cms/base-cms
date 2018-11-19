const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');
const { DateType, CursorType } = require('@limit0/graphql-custom-types');
const { ObjectIDType } = require('../types');

const platform = require('./platform');
const website = require('./website');

module.exports = deepAssign(
  platform,
  website,
  {
    /**
     * Custom scalar types.
     */
    ObjectID: ObjectIDType,
    Date: DateType,
    Cursor: CursorType,
    JSON: GraphQLJSON,

    // console.log(db);
    // db.call('findById', {
    //   modelName: 'platform.Content',
    //   id: 10028186,
    // }).then(doc => console.log(doc));

    /**
     * Root queries.
     */
    Query: {
      /**
       *
       */
      ping: () => 'pong!',
    },
  },
);
