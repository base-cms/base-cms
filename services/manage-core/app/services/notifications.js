import NotificationsService from 'ember-cli-notifications/services/notification-messages-service';
import { assign } from '@ember/polyfills';

export default NotificationsService.extend({
  init() {
    this._super(...arguments);
    this.setDefaultAutoClear(true);
    this.setDefaultClearDuration(3000);
  },

  info(message, options) {
    return this._super(message, assign({
      cssClasses: 'z-depth-3 bg-primary mb-3',
    }, options));
  },

  success(message, options) {
    return this._super(message, assign({
      cssClasses: 'z-depth-3 bg-success mb-3',
    }, options));
  },

  warning(message, options) {
    return this._super(message, assign({
      cssClasses: 'z-depth-3 bg-warning mb-3',
    }, options));
  },

  error(message, options) {
    return this._super(message, assign({
      cssClasses: 'z-depth-3 bg-danger mb-3',
      autoClear: false,
    }, options));
  },
});
