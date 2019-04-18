const { describe, it } = require('mocha');
const { expect } = require('chai');
const issue = require('../../../src/magazine/issue');
const requestParser = require('../../../src/request-parser');

describe('magazine/issue', () => {
  describe('the default configuration', () => {
    const obj = { _id: 1234 };
    const canonicalRules = requestParser({ headers: {} });
    const context = { canonicalRules };
    it('should return "/" when passed invalid input', async () => {
      const out = await issue({}, context);
      expect(out).to.equal('/');
    });
    it('should return "/magazine/1234"', async () => {
      const out = await issue(obj, context);
      expect(out).to.equal('/magazine/1234');
    });
  });

  describe('a prefix of "BRUNDON"', () => {
    const obj = { _id: 1234 };
    const canonicalRules = requestParser({ headers: { 'x-canonical-magazine-issue-prefix': 'BRUNDON' } });
    const context = { canonicalRules };
    it('should return "/" when passed invalid input', async () => {
      const out = await issue({}, context);
      expect(out).to.equal('/');
    });
    it('should return "/BRUNDON/1234"', async () => {
      const out = await issue(obj, context);
      expect(out).to.equal('/BRUNDON/1234');
    });
  });
});
