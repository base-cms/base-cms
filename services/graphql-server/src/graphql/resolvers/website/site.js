const { URL, URLSearchParams } = require('url');
const { UserInputError } = require('apollo-server-express');
const { asObject } = require('@base-cms/utils');
const defaults = require('../../defaults');

const cleanRedirect = async (redirect, from, basedb) => {
  // Redirect already found. Do nothing.
  if (redirect) return redirect;
  const regex = /\.html.+$/i;
  // From does not match the pattern. Do nothing.
  if (!regex.test(from)) return redirect;
  // Clean the url.
  const cleaned = from.replace(regex, '.html');
  // Try to find the redirect again.
  return basedb.findOne('website.Redirects', { from: cleaned });
};

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
  WebsiteRedirect: {
    code: ({ code }) => code || 301,
  },

  Query: {
    websiteContext: (_, args, { site }) => {
      if (site.exists()) return site.obj();
      return null;
    },
    websiteRedirect: async (_, { input }, { basedb, site }) => {
      const { from, params } = input;
      const siteId = input.siteId || site.id();
      if (!siteId) throw new UserInputError('A siteId must be provided via input or context.');

      const queryParams = new URLSearchParams(asObject(params));
      const redirect = await basedb.findOne('website.Redirects', { siteId, from });
      const cleaned = await cleanRedirect(redirect, from, basedb);

      // Preserve query string params (if applicable);
      if (cleaned && cleaned.to && `${queryParams}`) {
        // Determine if the `to` value has query params.
        // If so, merge with the incoming params.
        // If the same param is present in both, the `to` value wins.
        // Must put a "fake" host in front of the path to properly parse.
        const isExternal = /^http/.test(cleaned.to);
        const to = isExternal ? cleaned.to : `http://localhost${cleaned.to}`;
        const toUrl = new URL(to);
        toUrl.searchParams.forEach((value, key) => queryParams.set(key, value));
        const origin = isExternal ? toUrl.origin : '';
        cleaned.to = `${origin}${toUrl.pathname}?${queryParams}`;
      }
      return cleaned;
    },
  },
};
