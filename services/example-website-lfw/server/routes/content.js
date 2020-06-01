const { withContent } = require('@base-cms/marko-web/middleware');
const queryFragment = require('@endeavor-business-media/package-shared/graphql/fragments/content-page');
const companyQueryFragment = require('@endeavor-business-media/package-shared/graphql/fragments/content-company-page');
const noAdsLoadMore = require('@endeavor-business-media/package-shared/templates/content/no-ads-load-more');
const company = require('@endeavor-business-media/package-shared/templates/content/company');

const content = require('../templates/content');

module.exports = (app) => {
  app.get('/*?company/:id(\\d{8})*', withContent({
    template: company,
    queryFragment: companyQueryFragment,
  }));
  app.get('/*?webinar/:id(\\d{8})*', withContent({
    template: noAdsLoadMore,
    queryFragment,
  }));
  app.get('/*?whitepaper/:id(\\d{8})*', withContent({
    template: noAdsLoadMore,
    queryFragment,
  }));
  app.get('/*?:id(\\d{8})*', withContent({
    template: content,
    queryFragment,
  }));
};
