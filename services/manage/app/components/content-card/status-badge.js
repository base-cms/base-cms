import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNames: ['badge', 'badge-default', 'z-depth-half'],
  classNameBindings: ['color'],

  color: computed('status', function() {
    switch (this.get('status')) {
      case 'Published':
        return 'bg-success';
      case 'Deleted':
        return 'bg-danger';
      case 'Draft':
        return 'bg-warning';
      case 'Scheduled':
        return 'bg-info';
      case 'Expired':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }),

});
