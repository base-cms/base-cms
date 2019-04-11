global.Promise = require('bluebird');
global.chai = require('chai');
global.request = require('supertest');
global.sinon = require('sinon');

global.expect = global.chai.expect;
global.chai.use(require('chai-as-promised'));
