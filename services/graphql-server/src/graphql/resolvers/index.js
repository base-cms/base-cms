const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');
const { DateType, ObjectIDType } = require('../types');

const configuration = require('./configuration');
const brevity = require('./brevity');
const platform = require('./platform');
const website = require('./website');
const magazine = require('./magazine');
const email = require('./email');
const googleDataApi = require('./google-data-api');
const auth = require('./auth');

module.exports = deepAssign(
  auth,
  brevity,
  configuration,
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
