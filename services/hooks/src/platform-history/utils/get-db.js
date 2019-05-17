const basedb = require('../../basedb');

module.exports = async (stack, tenant) => {
  if (!tenant) throw new Error('No tenant was provided.');
  const db = basedb(tenant)[stack];
  if (!db) throw new Error(`No database found for '${stack}'`);

  const exists = await db.tenantExists();
  if (!exists) throw new Error(`The tenant '${tenant}' was not found on stack '${stack}'`);
  return db;
};
