const { BaseDB } = require('@base-cms/db');
const client = require('./mongodb');

const tenants = {};

module.exports = (tenant) => {
  if (!tenants[tenant]) {
    tenants[tenant] = new BaseDB({ tenant, client });
  }
  return tenants[tenant];
};
