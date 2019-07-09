const options = {
  fields: {
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
  const { leadsDelivery, salesContacts } = content;
  if (leadsDelivery && salesContacts && salesContacts.length) return salesContacts;

  if (content.company && content.company !== content._id) {
    const { company: _id } = content;
    const item = await basedb.findOne('platform.Content', { _id, leadsDelivery: true }, options);
    return contactsFor(item, basedb);
  }
  if (content.parentCompany && content.parentCompany !== content._id) {
    const { parentCompany: _id } = content;
    const item = await basedb.findOne('platform.Content', { _id, leadsDelivery: true }, options);
    return contactsFor(item, basedb);
  }
  if (content.parentSupplier && content.parentSupplier !== content._id) {
    const { parentSupplier: _id } = content;
    const item = await basedb.findOne('platform.Content', { _id, leadsDelivery: true }, options);
    return contactsFor(item, basedb);
  }
  if (content.parentVenue && content.parentVenue !== content._id) {
    const { parentVenue: _id } = content;
    const item = await basedb.findOne('platform.Content', { _id, leadsDelivery: true }, options);
    return contactsFor(item, basedb);
  }

  return [];
};

module.exports = async (content, _, { basedb }) => {
  const contactIds = await contactsFor(content, basedb);
  return basedb.find('platform.Content', { _id: { $in: contactIds }, status: 1, email: { $exists: true } }, { fields: { name: 1, email: 1 } });
};
