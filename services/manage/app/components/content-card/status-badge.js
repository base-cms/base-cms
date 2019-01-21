import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNames: ['badge', 'badge-pill', 'badge-default'],
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
      default:
        return 'bg-secondary';
    }
  }),

});
