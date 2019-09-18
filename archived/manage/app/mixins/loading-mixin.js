import Mixin from '@ember/object/mixin';
import { inject } from '@ember/service';

export default Mixin.create({
  loadingDisplay: inject(),

  showLoading() {
    this.get('loadingDisplay').show();
  },
  hideLoading() {
    this.get('loadingDisplay').hide();
  },
});
