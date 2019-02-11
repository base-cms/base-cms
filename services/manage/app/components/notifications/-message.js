import { computed } from '@ember/object';
import { inject } from '@ember/service';
import NotificationMessage from 'ember-cli-notifications/components/notification-message';

export default NotificationMessage.extend({
  notifications: inject(),

  closeIcon: computed(function() {
    return 'entypo icon-cross';
  }),

  notificationIcon: computed('notification.type', function() {
    switch (this.get('notification.type')){
      case 'info':
        return 'entypo icon-info-with-circle';
      case 'success':
        return 'entypo icon-thumbs-up';
      case 'warning':
        return 'entypo icon-warning';
      case 'error':
        return 'entypo icon-thumbs-down';
    }
  }),
});
