import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  mockData: inject(),

  model() {
    return this.get('mockData').allContent();
  },
});
