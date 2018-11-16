/* eslint-disable class-methods-use-this */
const { Serializers } = require('moleculer');
const EJSON = require('mongodb-extended-json');

class EJSONSerializer extends Serializers.Base {
  serialize(obj) {
    return EJSON.stringify(obj);
  }

  deserialize(buf) {
    return EJSON.parse(buf);
  }
}

module.exports = EJSONSerializer;
