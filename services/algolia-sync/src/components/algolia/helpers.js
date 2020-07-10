// Build out the sections and remove duplicates.
// Example: toplevel > secondlevel > thirdlevel
const buildSections = async (c) => {
  // Get the values of the seconds
  const sections = await c.websiteSchedules.map(s => (s.section.hierarchy.map(n => n.fullName)));
  // flatten the array and remove duplicates.
  const sectionsNames = [...new Set([].concat(...sections))];
  // format and build out section structure
  return sectionsNames.reduce((obj, name) => {
    const number = [name.split('>').length - 1];
    const key = `lev${number}`;
    const values = obj[key] || [];
    return { ...obj, [key]: [...values, name] };
  }, {});
};

// Slightly boost companies and maybe others later
const boostResult = async (node) => {
  if (node.type === 'company') {
    return 1;
  }
  return 0;
};

// Formats the object for Algolia's bulk update
const buildObj = async (nodes, tenant) => Promise.all(nodes.map(async (node) => {
  try {
    return {
      action: 'updateObject',
      indexName: tenant,
      body: {
        objectID: node.id,
        sections: await buildSections(node),
        ...node,
        boost: await boostResult(node),
      },
    };
  } catch (e) {
    throw (e, node);
  }
}));

module.exports = {
  buildObj,
  buildSections,
  boostResult,
};
