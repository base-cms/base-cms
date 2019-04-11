const { describe, it } = require('mocha');
const { expect } = require('chai');
const section = require('../../../src/website/section');
const requestParser = require('../../../src/request-parser');

describe('website/section', () => {
  it('should be a function', (done) => {
    expect(section).to.be.a('function');
    done();
  });

  describe('the default configuration', () => {
    const obj = {
      id: 1234,
      name: 'section',
      alias: '/section-alias',
    };
    const canonicalRules = requestParser({ headers: {} });
    const context = { canonicalRules };
    it('should return "/" when passed the home section.', async () => {
      const out = await section({ ...obj, alias: 'home' }, context);
      expect(out).to.equal('/');
    });
    it('should return "/" when not passed an alias', async () => {
      const out = await section({ ...obj, alias: undefined }, context);
      expect(out).to.equal('/');
    });
    it('should return "/alias" when passed "//alias"', async () => {
      const out = await section({ ...obj, alias: '//alias' }, context);
      expect(out).to.equal('/alias');
    });
    it('should return "/section-alias" when passed "/section-alias"', async () => {
      const out = await section(obj, context);
      expect(out).to.equal('/section-alias');
    });
  });
});
