import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import createProvider from './apollo/create-provider';

Vue.config.productionTip = false;

Vue.use(VueApollo);

new Vue({
  apolloProvider: createProvider({
    graphqlUri: 'https://caprica.graphql-staging.base-cms.io',
    tenantKey: 'pmmi_all',
  }),
  render: h => h(App),
}).$mount('#app');
