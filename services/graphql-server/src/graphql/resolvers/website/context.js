module.exports = {
  /**
   *
   */
  WebsiteContextLanguage: {
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
    websiteContext: (_, args, { site }) => site,
  },
};
