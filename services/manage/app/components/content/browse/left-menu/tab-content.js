import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['tab-content', 'bg-secondary'],
  classNameBindings: ['active'],

  active: computed('tab.key', 'activeTabKey', function() {
    return this.get('tab.key') === this.get('activeTabKey');
  }).readOnly(),

  activeTabKey: '',
  tab: null,

  componentName: computed('tab.key', function() {
    const key = this.get('tab.key');
    return `content/browse/left-menu/tab-content/${key}`;
  }),
});
