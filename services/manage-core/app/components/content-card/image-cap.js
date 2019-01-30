import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['embed-responsive embed-responsive-16by9'],

  contentId: null,
  name: null,
  statusText: null,
  type: null,
  image: null,

  /**
   * @todo This is contrived. Base should provide whether the image is a logo.
   */
  isLogo: computed('type', function() {
    return this.get('type') === 'Company';
  }),
});
