import Component from '@ember/component';
import { debounce } from '@ember/runloop';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  tagName: 'button',
  classNames: ['btn', 'bg-purple', 'text-white', 'px-3', 'animated'],
  attributeBindings: ['type', 'title', 'style'],
  type: 'button',
  title: 'Scroll To Top',

  style: computed('show', function() {
    const style = this.get('show') ? '' : 'display: none;';
    return htmlSafe(style);
  }).readOnly(),

  show: false,
  offset: 300,

  click() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.element.blur();
  },

  handleScroll() {
    debounce(this, 'scroll', 150);
  },

  scroll() {
    const { element } = this;
    const { scrollY, pageYOffset } = window;
    const y = scrollY || pageYOffset;
    const offset = this.get('offset');

    element.classList.remove('fadeIn', 'fadeOut');

    if (y > offset) {
      element.classList.add('fadeIn');
      this.set('show', true);
    } else {
      element.classList.add('fadeOut');
    }
  },

  didInsertElement() {
    const handle = this.handleScroll.bind(this);
    window.addEventListener('scroll', handle);
    document.addEventListener('touchmove', handle);
  },

  willDestroyElement() {
    const handle = this.handleScroll.bind(this);
    window.removeEventListener('scroll', handle);
    document.removeEventListener('touchmove', handle);
  },
});
