const { URL, URLSearchParams } = require('url');
const { UserInputError } = require('apollo-server-express');
const { asObject } = require('@base-cms/utils');

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

  /**
   *
   */
  /**
   *
   */
  WebsiteRedirect: {
    code: ({ code }) => code || 301,
  },

  Query: {
    websiteRedirect: async (_, { input }, { basedb, site }) => {
      const { from, params } = input;
      if (input.id) return basedb.findOne('website.Redirects', { _id: input.id });
      if (!from) throw new UserInputError('An id or from must be provided via input.');
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
