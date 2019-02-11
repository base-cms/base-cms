import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['btn-group'],
  attributeBindings: ['role'],

  role: 'group',

  selectedSortOption: computed('options.@each.key', 'sortByKey', function() {
    const key = this.get('sortByKey');
    return this.get('options').find(option => option.key === key);
  }),

  filteredOptions: computed('options.@each.key', 'selectedSortOption.key', function() {
    return this.get('options').filter(option => option.key !== this.get('selectedSortOption.key'));
  }),

  directionIcon: computed('directionKey', function() {
    if (this.get('directionKey') === 'asc') return 'arrow-with-circle-up';
    return 'arrow-with-circle-down';
  }),

  actions: {
    setSortByKey(key) {
      this.set('sortByKey', key);
    },
    toggleSortDirection() {
      const dir = this.get('directionKey');
      this.set('directionKey', dir === 'asc' ? 'desc' : 'asc');
    },
  },
});
