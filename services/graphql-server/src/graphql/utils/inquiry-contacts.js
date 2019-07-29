const { getAsObject } = require('@base-cms/object-path');

const options = {
  projection: {
    company: 1,
    salesContacts: 1,
    parentCompany: 1,
    parentSupplier: 1,
    parentVenue: 1,
  },
};

/**
 * Returns the first set of sales contacts in the heirarchy tree.
 * If no results are found, returns an empty array.
 */
const contactsFor = async (content, basedb) => {
  if (!content) return [];
  const { salesContacts } = content;
  const { enableRmi } = getAsObject(content, 'mutations.Website');
  if (enableRmi && salesContacts && salesContacts.length) return salesContacts;

  const relatedId = ['company', 'parentCompany', 'parentSupplier', 'parentVenue'].reduce((id, key) => {
    if (id) return id;
    const value = content[key];
    return (value !== content._id) ? value : id;
  }, null);

  if (relatedId) {
    const item = await basedb.findOne('platform.Content', { _id: relatedId, 'mutations.Website.enableRmi': true }, options);
    return contactsFor(item, basedb);
  }

  return [];
};

module.exports = async (content, _, { basedb }) => {
  const contactIds = await contactsFor(content, basedb);
  return basedb.find('platform.Content', { _id: { $in: contactIds }, status: 1, email: { $exists: true } }, { fields: { name: 1, email: 1 } });
};
