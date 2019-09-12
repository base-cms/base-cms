import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({
  isShowing: false,
  show() {
    if (!this.get('isShowing')) {
      this.set('isShowing', true);
      $('body').addClass('transitioning');
    }
  },
  hide() {
    window.setTimeout(() => {
      this.set('isShowing', false);
      $('body').removeClass('transitioning');
    }, 100);
  },
});
