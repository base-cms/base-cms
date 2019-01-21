import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['mb-5', 'col-12', 'col-md-6', 'col-lg-4'],

  typeDasherized: computed('type', function() {
    return this.get('type').replace(' ', '-').toLowerCase();
  }),

  teaserTruncated: computed('teaser', function() {
    const teaser = this.get('teaser');
    if (!teaser) return '';
    const words = teaser.split(' ');
    if (words.length > 20) return `${words.slice(0, 20).join(' ')}...`
    return teaser;
  }),
});
