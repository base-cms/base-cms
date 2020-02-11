const createClient = require('./utils/create-client');
const getActiveContext = require('./api/queries/get-active-context');
const checkContentAccess = require('./api/queries/check-content-access');
const tokenCookie = require('./utils/token-cookie');

const isEmpty = v => v == null || v === '';

class IdentityX {
  constructor({
    req,
    res,
    config,
  } = {}) {
    this.req = req;
    this.res = res;
    this.token = tokenCookie.getFrom(req);
    this.config = config;
    this.client = createClient({
      req,
      token: this.token,
      appId: config.getAppId(),
      config,
    });
  }

  async loadActiveContext() {
    if (!this.activeContextQuery) {
      this.activeContextQuery = this.client.query({ query: getActiveContext });
    }
    const { data = {} } = await this.activeContextQuery;
    return data.activeAppContext || {};
  }

  async checkContentAccess(input) {
    const variables = { input };
    const { data = {} } = await this.client.query({ query: checkContentAccess, variables });
    const access = data.checkContentAccess || {};
    access.requiresUserInput = false;

    const requiredFields = this.config.getRequiredServerFields();
    if (access.isLoggedIn && requiredFields.length) {
      // Check if the user requires additonal input.
      const { user } = await this.loadActiveContext();
      access.requiresUserInput = user ? requiredFields.some(key => isEmpty(user[key])) : false;
    }
    console.log(access);
    return access;
  }
}

module.exports = IdentityX;
