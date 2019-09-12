import Component from '@ember/component';
import { computed } from '@ember/object';
import SendEventMixin from '@base-cms/manage/mixins/send-event-mixin';

export default Component.extend(SendEventMixin, {
  tagName: 'a',
  classNames: ['list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center'],
  classNameBindings: ['active'],
  attributeBindings: ['role', 'href'],

  href: computed(function() {
    return '#';
  }).readOnly(),

  role: computed(function() {
    return 'button';
  }).readOnly(),

  active: computed('key', 'selected.[]', function() {
    return this.get('selected').includes(this.get('key'));
  }),

  key: null,
  name: null,
  count: 0,

  click(event) {
    event.preventDefault();
    this.sendEvent('on-click', this.get('key'));
    this.element.blur();
  },
});
