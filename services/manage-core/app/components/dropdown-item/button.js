import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'button',
  classNames: ['dropdown-item', 'd-flex', 'justify-content-between'],
  attributeBindings: ['type', 'title', 'disabled'],

  type: computed(function() {
    return 'button';
  }).readOnly(),

  value: null,
  icon: null,
  title: null,
  disabled: false,
});