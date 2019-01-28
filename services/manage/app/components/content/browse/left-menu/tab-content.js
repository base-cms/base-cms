import Component from '@ember/component';

export default Component.extend({
  classNames: ['tab-content', 'bg-secondary'],
  classNameBindings: ['activeTab'],
});
