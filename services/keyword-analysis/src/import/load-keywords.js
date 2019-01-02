const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const env = require('../env');

const { TENANT_KEY } = env;

/**
 *
 */
module.exports = () => yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, `../../${TENANT_KEY}_keywords.yml`)));
