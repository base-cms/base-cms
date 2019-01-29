import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  globalEvents: inject(),

  tagName: 'aside',
  classNames: ['left-menu'],
  classNameBindings: ['open'],

  activeTabKey: null,

  open: computed('activeTabKey', function() {
    if (this.get('activeTabKey')) return true;
    return false;
  }).readOnly(),

  activeTab: computed('activeTabKey', function() {
    const key = this.get('activeTabKey');
    if (!key) return {};
    return this.get('tabs').find(tab => tab.key === key) || {};
  }).readOnly(),

  init() {
    this._super(...arguments);
    this.set('tabs', [
      { key: 'content-types', title: 'Content Types', icon: 'open-book' },
      { key: 'status', title: 'Status', icon: 'light-bulb' },
      { key: 'scheduling', title: 'Scheduling', icon: 'pin' },
      { key: 'taxonomy', title: 'Taxonomy', icon: 'price-tag' },
      { key: 'dates', title: 'Dates', icon: 'calendar' },
    ]);
  },

  didInsertElement() {
    const events = this.get('globalEvents');
    const handleEscapeKey = this.handleEscapeKey.bind(this);
    events.addListener('keyup', handleEscapeKey);
    this.set('removeListener', () => events.removeListener('keyup', handleEscapeKey));
  },

  willDestroyElement() {
    this.get('removeListener')();
  },

  handleEscapeKey(event) {
    if (event.which === 27 && this.get('open')) {
      this.send('close');
    }
  },

  actions: {
    setActiveTabKey(key) {
      const { open, activeTabKey } = this.getProperties('open', 'activeTabKey');
      if (open && activeTabKey === key) {
        this.send('close');
      } else {
        this.set('activeTabKey', key);
      }
    },
    close() {
      this.set('activeTabKey', null);
    },
  },
});
