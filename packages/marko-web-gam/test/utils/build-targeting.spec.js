const { describe, it } = require('mocha');
const { expect } = require('chai');
const builder = require('../../utils/build-targeting');

describe('utils/build-targeting', () => {
  describe('character cleaning', () => {
    it('should strip invalid characters from keys', async () => {
      const out = await builder({ 'key"\'=!+#*~;^()[]<>,.&123': 'good value' });
      expect(out).to.equal('setTargeting(\'key123\', \'good value\')');
    });
    it('should strip invalid characters from string values', async () => {
      const out = await builder({ key123: 'good"\'=!+#*~;^()[]<>,.& value' });
      expect(out).to.equal('setTargeting(\'key123\', \'good value\')');
    });
    it('should strip invalid characters from array values', async () => {
      const out = await builder({
        key123: [
          'good"\'=!+#*~;^()[]<>,.& value',
          'another value',
          'aonther #*~;^() value',
        ],
      });
      expect(out).to.equal(`setTargeting('key123', ${JSON.stringify([
        'good value',
        'another value',
        'aonther  value',
      ])})`);
    });
    it('should return a valid array', async () => {
      const test = ['array', 'of', 'values'];
      const out = await builder({ key123: test });
      expect(out).to.equal(`setTargeting('key123', ${JSON.stringify(test)})`);
    });
  });

  // describe('a prefix of "BRUNDON"', () => {
  //   const obj = { _id: 1234 };
  //   const canonicalRules = requestParser({ headers: { 'x-canonical-magazine-issue-prefix':
  // 'BRUNDON' } });
  //   const context = { canonicalRules };
  //   it('should return "/" when passed invalid input', async () => {
  //     const out = await issue({}, context);
  //     expect(out).to.equal('/');
  //   });
  //   it('should return "/BRUNDON/1234"', async () => {
  //     const out = await issue(obj, context);
  //     expect(out).to.equal('/BRUNDON/1234');
  //   });
  // });
});
