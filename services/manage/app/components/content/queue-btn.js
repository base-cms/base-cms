import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['btn-group', 'dropup', 'btn-content-queue', 'animated'],
  attributeBindings: ['style'],
  count: 0,

  visible: false,

  showAnimation: 'bounceInUp',
  hideAnimation: 'bounceOutDown',

  style: computed('visible', function() {
    const style = this.get('visible') ? '' : 'display: none;';
    return htmlSafe(style);
  }).readOnly(),

  onCountChange: observer('count', function() {
    this.set('shouldShow', this.get('count') > 0);
  }),

  onShowChange: observer('shouldShow', function() {
    if (this.get('shouldShow')) {
      this.doShow();
    } else {
      this.doHide();
    }
  }),

  doShow() {
    this.element.classList.remove(this.get('hideAnimation'), 'closing');
    this.element.classList.add(this.get('showAnimation'));
    this.set('visible', true);
  },

  doHide() {
    this.element.classList.remove(this.get('showAnimation'));
    this.element.classList.add(this.get('hideAnimation'), 'closing');
  },

  didInsertElement() {
    const { element } = this;
    element.addEventListener('animationstart', () => {
    });
    element.addEventListener('animationend', () => {
      this.set('visible', this.get('shouldShow'));
    });
  },
});
