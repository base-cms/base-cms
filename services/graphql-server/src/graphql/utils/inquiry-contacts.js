const { get, getAsArray } = require('@base-cms/object-path');

/**
 * Returns the first set of sales contacts in the heirarchy tree.
 * If no results are found, returns an empty array.
 */
const contactsFor = async (content, basedb) => {
  if (!content) return [];
  const enableRmi = get(content, 'mutations.Website.enableRmi');
  const salesContacts = getAsArray(content, 'salesContacts');
  if (enableRmi && salesContacts.length) return salesContacts;

  const relatedId = ['company', 'parentCompany', 'parentSupplier', 'parentVenue'].reduce((id, key) => {
    if (id) return id;
    const value = content[key];
    return (value !== content._id) ? value : id;
  }, null);

  if (relatedId) {
    const projection = {
      company: 1,
      salesContacts: 1,
      parentCompany: 1,
      parentSupplier: 1,
      parentVenue: 1,
    };
    const item = await basedb.findOne('platform.Content', { _id: relatedId, 'mutations.Website.enableRmi': true }, { projection });
    return contactsFor(item, basedb);
  }

  return [];
};

module.exports = async (content, _, { basedb }) => {
  const contactIds = await contactsFor(content, basedb);
  const emails = {
    $or: [
      { email: { $exists: true } },
      { publicEmail: { $exists: true } },
    ],
  };
  return basedb.find('platform.Content', { _id: { $in: contactIds }, ...emails }, { fields: { name: 1, email: 1, publicEmail: 1 } });
};
