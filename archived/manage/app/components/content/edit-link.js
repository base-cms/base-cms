import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  contentId: null,
  type: null,

  dasherizedType: computed('type', function() {
    return this.get('type').replace(' ', '-').toLowerCase();
  }),
});
