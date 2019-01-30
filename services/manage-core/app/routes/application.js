import Route from '@ember/routing/route';
import LoadingMixin from '@base-cms/manage-core/mixins/loading-mixin';

export default Route.extend(LoadingMixin, {

  actions: {
    /**
     *
     * @param {*} transition
     */
    loading(transition) {
      this.showLoading();
      transition.finally(() => this.hideLoading());
    },
  },
});
