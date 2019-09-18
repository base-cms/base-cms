import Component from '@ember/component';
import { computed } from '@ember/object';
import config from '@base-cms/manage/config/environment';

export default Component.extend({
  tagName: 'nav',
  classNames: ['content-header__navbar', 'navbar', 'navbar-expand', 'navbar-dark'],

  rootURL: computed(function() {
    return config.rootURL;
  }),

});
