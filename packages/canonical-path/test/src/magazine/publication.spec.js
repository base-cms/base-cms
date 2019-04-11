const { describe, it } = require('mocha');
const { expect } = require('chai');
const publication = require('../../../src/magazine/publication');
const requestParser = require('../../../src/request-parser');

describe('magazine/publication', () => {
  describe('the default configuration', () => {
    const obj = {
      _id: 1234,
    };
    const canonicalRules = requestParser({ headers: {} });
    const context = { canonicalRules };
    it('should return "/" when passed invalid input', async () => {
      const out = await publication({}, context);
      expect(out).to.equal('/');
    });
    it('should return "/magazine/1234"', async () => {
      const out = await publication(obj, context);
      expect(out).to.equal('/magazine/1234');
    });
  });

  describe('a prefix of "BRANDAN/OWITZ"', () => {
    const obj = { _id: 1234 };
    const canonicalRules = requestParser({ headers: { 'x-canonical-magazine-publication-prefix': 'BRANDAN/OWITZ' } });
    const context = { canonicalRules };
    it('should return "/" when passed invalid input', async () => {
      const out = await publication({}, context);
      expect(out).to.equal('/');
    });
    it('should return "/BRANDAN/OWITZ/1234"', async () => {
      const out = await publication(obj, context);
      expect(out).to.equal('/BRANDAN/OWITZ/1234');
    });
  });
});
