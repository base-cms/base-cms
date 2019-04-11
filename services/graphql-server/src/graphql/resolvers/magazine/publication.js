const { magazinePublication: canonicalPathFor } = require('@base-cms/canonical-path');

module.exports = {
  /**
   *
   */
  MagazinePublication: {
    canonicalPath: (publication, _, ctx) => canonicalPathFor(publication, ctx),
  },
};
