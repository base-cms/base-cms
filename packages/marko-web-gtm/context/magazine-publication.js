const { asObject } = require('@base-cms/utils');

module.exports = ({ obj }) => {
  const publication = asObject(obj);
  return {
    page_type: 'magazine-publication',
    canonical_path: publication.canonicalPath,
    publication: {
      id: publication.id,
      name: publication.name,
    },
  };
};
