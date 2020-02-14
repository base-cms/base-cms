const { getAsObject } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

const { MARKO_WEB_GTM_USE_ORIGINAL_URL } = process.env;

module.exports = ({ obj, req }) => {
  const issue = asObject(obj);
  const publication = getAsObject(issue, 'publication');
  return {
    page_type: 'magazine-issue',
    canonical_path: MARKO_WEB_GTM_USE_ORIGINAL_URL ? req.originalUrl : issue.canonicalPath,
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
