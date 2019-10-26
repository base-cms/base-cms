const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');
const { DateType, ObjectIDType } = require('../types');

const platform = require('./platform');
const website = require('./website');
const magazine = require('./magazine');
const email = require('./email');
const googleDataApi = require('./google-data-api');

module.exports = deepAssign(
  googleDataApi,
  platform,
  website,
  magazine,
  email,
  {
    /**
     * Custom scalar types.
     */
    Date: DateType,
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
    /**
     * Root mutations.
     */
    Mutation: {
      /**
       *
       */
      ping: () => 'pong',
    },
  },
);
