import { inject } from '@ember/service';
import NotificationContainer from 'ember-cli-notifications/components/notification-container';

export default NotificationContainer.extend({
  notifications: inject(),
});
