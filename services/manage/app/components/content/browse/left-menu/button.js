import Component from '@ember/component';
import { computed } from '@ember/object';
import SendEventMixin from '@base-cms/manage-core/mixins/send-event-mixin';

export default Component.extend(SendEventMixin, {
  tagName: 'button',
  classNames: ['btn', 'tab-btn'],
  classNameBindings: ['active'],
  attributeBindings: ['type', 'title'],
  type: 'button',

  active: computed('for', 'activeTab', function() {
    return this.get('for') === this.get('activeTab');
  }).readOnly(),

  title: null,
  for: '',
  activeTab: null,

  click() {
    this.sendEvent('on-click', this.get('for'));
    this.element.blur();
  },
});
