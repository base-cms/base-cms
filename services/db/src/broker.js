const { ServiceBroker } = require('moleculer');
const { Serializers } = require('@base-cms/moleculer');
const { NATS_DSN, NATS_LOGLEVEL } = require('./env');

module.exports = new ServiceBroker({
  namespace: 'base-cms',
  transporter: NATS_DSN,
  logLevel: NATS_LOGLEVEL,
  logFormatter: 'simple',
  serializer: new Serializers.EJSONSerializer(),
});
