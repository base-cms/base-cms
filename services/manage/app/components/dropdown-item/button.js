import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'button',
  classNames: ['dropdown-item', 'd-flex', 'justify-content-between'],
  classNameBindings: ['active'],
  attributeBindings: ['type', 'title', 'disabled'],

  type: computed(function() {
    return 'button';
  }).readOnly(),

  active: false,
  value: null,
  icon: null,
  title: null,
  disabled: false,
});