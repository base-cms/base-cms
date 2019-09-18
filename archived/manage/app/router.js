import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('content', function() {
    this.route('browse', { path: '' }, function() {
      this.route('create');
    });
    this.route('edit', { path: ':type/:id' }, function() {

    });
  });
});

export default Router;
