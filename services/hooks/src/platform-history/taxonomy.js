const { BaseDB } = require('@base-cms/db');
const slugFn = require('slug');

const sluggify = value => slugFn(value).toLowerCase();

const loadParents = async (taxonomy, db, projection, parents = []) => {
  const ref = BaseDB.get(taxonomy, 'parent');
  const id = BaseDB.extractRefId(ref);
  if (!id) return parents;
  const parent = await db.findOne('platform.Taxonomy', { _id: id }, { projection });
  if (!parent) return parents;
  parents.push(parent);
  return loadParents(parent, db, projection, parents);
};

const updateTaxonomy = (id, db, $set) => db.updateOne('platform.Taxonomy', { _id: id }, { $set });

const createAlias = tree => tree.map(name => sluggify(name)).join('/');

const createFullName = (id, tree) => {
  const v = tree.slice();
  const type = v.shift();
  return `${type}: ${v.join(' > ')} (${id})`;
};

const updateChildren = async (tree, taxonomy, db, projection, data = []) => {
  const children = await db.find('platform.Taxonomy', { 'parent.$id': taxonomy._id }, { projection });
  if (!children.length) return data;
  await Promise.all(children.map(async (child) => {
    const { _id: id, name } = child;
    const childTree = tree.concat(name);
    const $set = {
      alias: createAlias(childTree),
      fullName: createFullName(id, childTree),
    };
    await updateTaxonomy(id, db, $set);
    data.push({ id, ...$set });
    return updateChildren(childTree, child, db, projection, data);
  }));
  return data;
};


const update = async (db, h) => {
  const id = h.id();
  const projection = {
    _id: 1,
    name: 1,
    type: 1,
    parent: 1,
    alias: 1,
  };
  const taxonomy = await db.findOne('platform.Taxonomy', { _id: id }, { projection });
  const parents = await loadParents(taxonomy, db, projection, [taxonomy]);

  const tree = parents.reverse().reduce((arr, parent) => {
    arr.push(parent.name);
    return arr;
  }, [taxonomy.type]);

  const $set = {
    alias: createAlias(tree),
    fullName: createFullName(id, tree),
  };
  await updateTaxonomy(id, db, $set);
  return updateChildren(tree, taxonomy, db, projection, [{ id, ...$set }]);
};

const updateContent = async (db, content) => {
  const { _id } = content;
  const taxIds = BaseDB.extractRefIds(content.taxonomy);
  const taxonomies = await db.find('platform.Taxonomy', { _id: { $in: taxIds } }, { projection: { alias: 1 } });
  const taxonomyAliases = taxonomies.map(t => t.alias).filter(v => v);
  await db.updateOne('platform.Content', { _id }, { $set: { taxonomyAliases } });
  return { id: _id, taxonomyAliases };
};

const updateRelatedContent = async (db, taxonomy) => {
  const taxIds = taxonomy.map(row => row.id);
  const content = await db.find('platform.Content', { 'taxonomy.$id': { $in: taxIds } }, { projection: { _id: 1, 'taxonomy.$id': 1 } });
  const data = [];
  await Promise.all(content.map(async (c) => {
    const updated = await updateContent(db, c);
    data.push(updated);
  }));
  return data;
};

module.exports = async (db, history) => {
  const parent = history.field('parent');
  if (history.wasChanged()) {
    if (history.field('name') || parent || parent === null) {
      const taxonomy = await update(db, history);
      const content = await updateRelatedContent(db, taxonomy);
      return { taxonomy, content };
    }
  } else if (history.wasCreated()) {
    const taxonomy = await update(db, history);
    return { taxonomy, content: [] };
  }
  return { taxonomy: [], content: [] };
};
