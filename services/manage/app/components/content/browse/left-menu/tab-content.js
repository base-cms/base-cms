import Component from '@ember/component';
import { computed } from '@ember/object';
import SendEventMixin from '@base-cms/manage/mixins/send-event-mixin';

export default Component.extend(SendEventMixin, {
  classNames: ['tab-content'],
  classNameBindings: ['active'],

  active: computed('tab.key', 'activeTabKey', function() {
    return this.get('tab.key') === this.get('activeTabKey');
  }).readOnly(),

  activeTabKey: '',
  tab: null,

  actions: {
    close() {
      this.sendEvent('on-close');
    },
  },
});
