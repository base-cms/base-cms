const { describe, it } = require('mocha');
const { expect } = require('chai');
const content = require('../../../src/platform/content');
const requestParser = require('../../../src/request-parser');

describe('platform/content', () => {
  describe('the default configuration', () => {
    const site = {
      id: () => 5678,
    };
    const section = {
      alias: '/primary-section',
    };
    const contentObj = {
      _id: 1234,
      type: 'Article',
      name: 'Content Title Sluggified',
      mutations: {
        Website: {
          slug: 'content-title-sluggified',
          primarySection: 5678,
        },
      },
    };
    const canonicalRules = requestParser({ headers: {} });
    const load = () => section;
    const context = { load, canonicalRules, site };
    it('should return "/home/article/1234" when passed no website mutation date', async () => {
      const out = await content({ ...contentObj, mutations: undefined }, context);
      expect(out).to.equal('/home/article/1234');
    });
    it('should return "/home/article/1234/content-title-sluggified" when passed no primary section', async () => {
      const { slug } = contentObj.mutations.Website;
      const mutations = { Website: { slug } };
      const out = await content({ ...contentObj, mutations }, context);
      expect(out).to.equal('/home/article/1234/content-title-sluggified');
    });
    it('should return "/primary-section/article/1234/content-title-sluggified" when passed valid primary section', async () => {
      const out = await content(contentObj, context);
      expect(out).to.equal('/primary-section/article/1234/content-title-sluggified');
    });
  });
});
