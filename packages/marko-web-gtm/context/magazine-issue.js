const { getAsObject } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

module.exports = ({ obj }) => {
  const issue = asObject(obj);
  const publication = getAsObject(issue, 'publication');
  return {
    page_type: 'magazine-issue',
    canonical_path: issue.canonicalPath,
    issue: {
      id: issue.id,
      name: issue.name,
      mailed: issue.mailed ? new Date(issue.mailed).toISOString() : undefined,
    },
    publication: {
      id: publication.id,
      name: publication.name,
    },
  };
};
