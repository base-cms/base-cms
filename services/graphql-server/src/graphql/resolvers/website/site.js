const defaults = require('../../defaults');

module.exports = {
  /**
   *
   */
  WebsiteSite: {
    origin: ({ host }) => `https://${host}`,
    imageHost: ({ imageHost }) => imageHost || defaults.imageHost,
    assetHost: ({ assetHost }) => assetHost || defaults.assetHost,
    language: ({ language }) => ({ ...defaults.language, ...language }),
    date: ({ date }) => ({ ...defaults.date, ...date }),
    title: ({ name, shortName }) => {
      if (shortName) return `${name} (${shortName})`;
      return name;
    },
  },

  /**
   *
   */
  WebsiteSiteLanguage: {
    code: (language) => {
      const { primaryCode, subCode } = language;
      const primary = primaryCode.toLowerCase();
      if (!subCode) return primary;
      return `${primary}-${subCode.toLowerCase()}`;
    },

    primaryCode: language => language.primaryCode.toLowerCase(),

    subCode: (language) => {
      if (!language.subCode) return null;
      return language.subCode.toLowerCase();
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteContext: (_, args, { site }) => {
      if (site.exists()) return site.obj();
      return null;
    },
  },
};
