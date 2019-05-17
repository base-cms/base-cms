const { isArray } = Array;

const handle = async (db, history) => {
  const id = history.id();
  const added = history.field('taxonomy.added');
  if (!isArray(added)) {
    return db.updateOne('platform.Content', { _id: id }, { $unset: { taxonomyAliases: '' } });
  }
  const taxIds = added.map(tax => tax.id);
  const taxonomy = await db.find('platform.Taxonomy', { _id: { $in: taxIds } }, { alias: 1 });
  const taxonomyAliases = taxonomy.map(tax => tax.alias);
  return db.updateOne('platform.Content', { _id: id }, { $set: { taxonomyAliases } });
};

module.exports = { handle };
