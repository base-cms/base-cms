const { withMagazineSubscribeUrl } = require('@base-cms/marko-web/middleware');
const queryFragment = require('../api/fragments/magazine-publication');
const subscribeMagazine = require('../templates/subscribe/magazine');

module.exports = (app) => {
  app.get(':subscribeUrl(/subscribe/print/[a-zA-Z]+)', withMagazineSubscribeUrl({
    template: subscribeMagazine,
    queryFragment,
  }));
};
