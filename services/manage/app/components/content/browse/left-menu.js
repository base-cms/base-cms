import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'aside',
  classNames: ['left-menu'],
  classNameBindings: ['open'],
  open: false,

  activeTabKey: null,

  activeTab: computed('activeTabKey', function() {
    const key = this.get('activeTabKey');
    if (!key) return {};
    return this.get('tabs').find(tab => tab.key === key) || {};
  }).readOnly(),

  init() {
    this._super(...arguments);
    this.set('tabs', [
      { key: 'types', title: 'Content Types', icon: 'open-book' },
      { key: 'status', title: 'Status', icon: 'light-bulb' },
      { key: 'scheduling', title: 'Scheduling', icon: 'pin' },
      { key: 'taxonomy', title: 'Taxonomy', icon: 'price-tag' },
      { key: 'dates', title: 'Dates', icon: 'calendar' },
    ]);
  },

  actions: {
    setActiveTabKey(key) {
      const { open, activeTabKey } = this.getProperties('open', 'activeTabKey');
      if (open && activeTabKey === key) {
        this.send('close');
      } else if (!open) {
        this.set('open', true);
        this.set('activeTabKey', key);
      } else {
        this.set('activeTabKey', key);
      }
    },
    close() {
      this.set('open', false);
      this.set('activeTabKey', null);
    },
  },
});
