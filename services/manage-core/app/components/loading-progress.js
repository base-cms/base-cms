import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import LoadingMixin from '@base-cms/manage-core/mixins/loading-mixin';

export default Component.extend(LoadingMixin, {
  classNames: ['application-loading', 'progress', 'fixed-top'],
  attributeBindings: ['style'],
  progressBackground: 'bg-primary',
  show: computed.readOnly('loadingDisplay.isShowing'),

  style: computed('show', function() {
    const style = this.get('show') ? '' : 'display: none;';
    return htmlSafe(style);
  }).readOnly(),
});
