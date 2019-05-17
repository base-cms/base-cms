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

module.exports = async (db, history) => {
  console.log(history);
  if ((history.wasChanged() && history.field('name')) || history.wasCreated()) {
    const data = await update(db, history);
    console.log(data);
  }
};
