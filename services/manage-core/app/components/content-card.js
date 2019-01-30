import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['mb-5', 'col-12', 'col-sm-6', 'col-lg-4', 'col-xl-3'],

  /**
   * Determines the user attribution type to display.
   */
  attributionType: 'updated',

  /**
   * @todo This is contrived. Update to support HTML and words.
   */
  teaserTruncated: computed('content.teaser', function() {
    const teaser = this.get('content.teaser');
    if (!teaser) return '';
    if (teaser.length > 100) return `${teaser.slice(0, 100)}...`;
    return teaser;
  }),

  isQueued: computed('contentQueue', function() {
    const queue = this.get('contentQueue');
    return queue.includes(this.get('content.id'));
  }),

  actions: {
    emitQueueChange(event) {
      const { checked } = event.target;
      const id = this.get('content.id');
      this.get('onQueueChange')(id, checked);
    },
  },
});
