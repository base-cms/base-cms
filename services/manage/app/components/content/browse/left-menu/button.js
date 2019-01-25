import Component from '@ember/component';
import { computed } from '@ember/object';
import SendEventMixin from '@base-cms/manage/mixins/send-event-mixin';

export default Component.extend(SendEventMixin, {
  tagName: 'button',
  classNames: ['btn', 'text-white', 'bg-gray', 'mb-3', 'mr-0', 'btn-left-menu'],
  classNameBindings: ['active'],
  attributeBindings: ['type', 'title'],
  type: 'button',

  active: computed('for', 'activeMenu', function() {
    return this.get('for') === this.get('activeMenu');
  }).readOnly(),

  title: null,
  for: '',
  activeMenu: null,

  click() {
    this.sendEvent('on-click', this.get('for'));
    this.element.blur();
  },
});
