import Component from '@ember/component';

export default Component.extend({
  tagName: 'aside',
  classNames: ['left-menu'],
  classNameBindings: ['open'],
  open: false,

  activeTab: null,

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
    setActiveTab(name) {
      const { open, activeTab } = this.getProperties('open', 'activeTab');
      if (open && activeTab === name) {
        this.send('close');
      } else if (!open) {
        this.set('open', true);
        this.set('activeTab', name);
      } else {
        this.set('activeTab', name);
      }
    },
    close() {
      this.set('open', false);
      this.set('activeTab', null);
    },
  },
});
