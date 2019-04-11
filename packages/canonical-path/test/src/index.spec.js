const { describe, it } = require('mocha');
const { expect } = require('chai');
const index = require('../../src/index');

describe('index', () => {
  // Ensure exports causing a backwards compatibility break are not removed.
  // If these exports are removed, this package must have a minor version bump.
  const known = ['requestParser', 'platformContent', 'websiteSection', 'magazineIssue', 'magazinePublication'];
  it(`must not remove public exports ${known}.`, (done) => {
    expect(index).to.be.an('object').and.include.all.keys(known);
    done();
  });
});
