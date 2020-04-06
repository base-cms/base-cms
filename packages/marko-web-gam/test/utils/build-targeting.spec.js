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
});
