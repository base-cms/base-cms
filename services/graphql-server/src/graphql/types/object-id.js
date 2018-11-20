const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoDB } = require('@base-cms/db');

const { ObjectID } = MongoDB;

module.exports = new GraphQLScalarType({
  name: 'ObjectID',
  description: 'MongoDB ObjectID type.',
  parseValue(value) {
    if (typeof value === 'string') {
      return ObjectID.createFromHexString(value);
    }
    throw new Error(`${typeof value} not convertible to ObjectID.`);
  },
  serialize(value) {
    if (value instanceof ObjectID) {
      return value.toHexString();
    }
    if (typeof value === 'string') {
      return value;
    }
    throw new Error(`${Object.getPrototypeOf(value).constructor.name} not convertible to string.`);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ObjectID.createFromHexString(ast.value);
    }
    throw new Error(`${ast.kind} not convertible to ObjectID.`);
  },
});
