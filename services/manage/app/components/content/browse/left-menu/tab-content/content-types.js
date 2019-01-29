import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  clearDisabled: computed('selected.length', function() {
    if (this.get('selected.length')) return false;
    return true;
  }),
});

