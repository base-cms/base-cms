const createClient = require('./utils/create-client');
const getActiveContext = require('./api/queries/get-active-context');
const checkContentAccess = require('./api/queries/check-content-access');
const tokenCookie = require('./utils/token-cookie');

class IdentityX {
  constructor({
    req,
    res,
    appId,
    config,
    linkConfig,
  } = {}) {
    this.req = req;
    this.res = res;
    this.token = tokenCookie.getFrom(req);
    this.client = createClient({
      req,
      token: this.token,
      appId,
      config,
      linkConfig,
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
    return data.checkContentAccess || {};
  }
}

module.exports = IdentityX;
