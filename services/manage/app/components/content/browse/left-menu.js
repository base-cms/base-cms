import Component from '@ember/component';

export default Component.extend({
  classNames: ['browse-left-menu'],
  classNameBindings: ['open'],
  open: false,

  activeMenu: null,

  actions: {
    setActiveMenu(name) {
      const { open, activeMenu } = this.getProperties('open', 'activeMenu');
      if (open && activeMenu === name) {
        this.send('close');
      } else if (!open) {
        this.set('open', true);
        this.set('activeMenu', name);
      } else {
        this.set('activeMenu', name);
      }
    },
    close() {
      this.set('open', false);
      this.set('activeMenu', null);
    },
  },
});
