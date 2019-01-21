import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  classNames: ['mb-5', 'col-12', 'col-md-6', 'col-lg-4'],

  typeDasherized: computed('type', function() {
    return this.get('type').replace(' ', '-').toLowerCase();
  }),

  /**
   * @todo This is contrived. Update to support HTML and words.
   */
  teaserTruncated: computed('teaser', function() {
    const teaser = this.get('teaser');
    if (!teaser) return '';
    if (teaser.length > 75) return `${teaser.slice(0, 75)}...`;
    return teaser;
  }),

  updatedFromNow: computed('updated', function() {
    return moment(this.get('updated')).fromNow();
  }),

  updatedDate: computed('updated', function() {
    return moment(this.get('updated')).format();
  }),
});
