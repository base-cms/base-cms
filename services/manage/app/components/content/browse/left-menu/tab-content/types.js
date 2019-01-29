import Component from '@ember/component';
import InitValueMixin from '@base-cms/manage/mixins/init-value-mixin';

export default Component.extend(InitValueMixin, {

  init() {
    this._super(...arguments);
    // @todo This needs to be passed from the Graph API.
    this.initValue('facets', [
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
  },
});

