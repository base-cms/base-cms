import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNames: ['badge', 'text-default', 'text-uppercase', 'z-depth-1'],
  classNameBindings: ['color'],

  color: computed('status', function() {
    switch (this.get('status')) {
      case 'Published':
        return 'badge-success';
      case 'Deleted':
        return 'badge-danger';
      case 'Draft':
        return 'badge-warning';
      case 'Scheduled':
        return 'badge-info';
      case 'Expired':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }),

});
