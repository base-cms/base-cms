const BaseDB = require('./basedb');
const MongoDB = require('./mongodb');
const createMongoClient = require('./create-mongo-client');
const createBaseDB = require('./create-basedb');

module.exports = {
  BaseDB,
  MongoDB,
  createMongoClient,
  createBaseDB,
};
