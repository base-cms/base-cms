const { describe, it } = require('mocha');
const { expect } = require('chai');
const requestParser = require('../../src/request-parser');

describe('request-parser', () => {
  it('should be a function', (done) => {
    expect(requestParser).to.be.a('function');
    done();
  });
  const out = requestParser({ headers: {} });
  it('should return an object with parsing rules', (done) => {
    expect(out).to.be.an('object').and.include.keys(['content', 'websiteSection', 'dynamicPage']);
    done();
  });
  it('should have "prefix" and "parts" on all children', (done) => {
    Object.keys(out).forEach((k) => {
      const prop = out[k];
      expect(prop).to.have.property('prefix').and.be.a('string');
      expect(prop).to.have.property('parts').and.be.an('array');
    });
    done();
  });
});
