/* eslint-disable class-methods-use-this */
const { Serializers } = require('@base-cms/moleculer');
const Client = require('../client');

module.exports = Client({
  serviceName: 'db',
  brokerOpts: {
    serializer: new Serializers.EJSONSerializer(),
  },
});
