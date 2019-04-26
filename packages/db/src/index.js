const BaseDB = require('./basedb');
const MongoDB = require('./mongodb');
const mongodbFactory = require('./mongodb-factory');
const basedbFactory = require('./basedb-factory');

module.exports = {
  BaseDB,
  MongoDB,
  mongodbFactory,
  basedbFactory,
};
