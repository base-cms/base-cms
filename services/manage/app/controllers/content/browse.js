import Controller from '@ember/controller';
import { observer } from '@ember/object';

export default Controller.extend({
  /**
   * Query params
   */
  queryParams: null,
  'active-tab': null,
  attribution: 'updated',
  'content-types': null,
  'sort-by': 'updated',
  'sort-direction': 'asc',

  splitContentTypes: observer('content-types', function() {
    const value = this.get('content-types');
    this.set('selectedContentTypes', value ? value.split(',') : []);
  }),

  joinContentTypes: observer('selectedContentTypes.[]', function() {
    const value = this.get('selectedContentTypes');
    this.set('content-types', value && value.length ? value.join(',') : null);
  }),

  init() {
    this._super(...arguments);
    this.set('selectedContentTypes', []);
    // @todo This needs to be passed from the Graph API.
    this.set('facets', [
      { key: 'article', name: 'Article', count: 9602 },
      { key: 'blog', name: 'Blog', count: 1202 },
      { key: 'company', name: 'Company', count: 14309 },
      { key: 'contact', name: 'Contact', count: 3518 },
      { key: 'document', name: 'Document', count: 868 },
      { key: 'event', name: 'Event', count: 430 },
      { key: 'job', name: 'Job', count: 2 },
      { key: 'media-gallery', name: 'Media Gallery', count: 30 },
      { key: 'news', name: 'News', count: 5337 },
      { key: 'page', name: 'Page', count: 2 },
      { key: 'podcast', name: 'Podcast', count: 104 },
      { key: 'press-release', name: 'Press Release', count: 11556 },
      { key: 'product', name: 'Product', count: 17273 },
      { key: 'promotion', name: 'Promotion', count: 801 },
      { key: 'video', name: 'Video', count: 3922 },
      { key: 'webinar', name: 'Webinar', count: 10 },
      { key: 'whitepaper', name: 'Whitepaper', count: 350 },
    ]);

    this.set('sortOptions', [
      { key: 'created', label: 'Created Date', icon: 'calendar' },
      { key: 'published', label: 'Published Date', icon: 'calendar' },
      { key: 'updated', label: 'Updated Date', icon: 'calendar' },
      { key: 'name', label: 'Name', icon: 'text-document' },
      { key: 'relevance', label: 'Relevance', icon: 'magnifying-glass' },
    ]);

    this.set('queryParams', [
      'active-tab',
      'attribution',
      'content-types',
      'sort-by',
      'sort-direction',
    ]);
    this.set('contentQueue', []);
  },

  actions: {
    queue(id, checked) {
      const queue = new Set(this.get('contentQueue'));
      if (checked) {
        queue.add(id);
      } else {
        queue.delete(id);
      }
      this.set('contentQueue', [...queue]);
    },

    clearQueue() {
      this.set('contentQueue', []);
    },

    toggleContentTypes(key) {
      event.preventDefault();
      const selected = this.get('selectedContentTypes');
      if (selected.indexOf(key) === -1) {
        selected.pushObject(key);
      } else {
        selected.removeObject(key);
      }
    },

    clearContentTypes() {
      this.set('selectedContentTypes', []);
    },
  },

});
