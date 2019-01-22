import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-success', 'btn-circle', 'btn-xl', 'btn-content-create', 'z-depth-2'],
  attributeBindings: ['type'],

  router: inject(),

  type: 'button',
  icon: 'squared-plus',

  click() {
    this.get('router').transitionTo('content.browse.create');
  },
});
