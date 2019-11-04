/* eslint-disable no-new */
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import Leaders from './components/leaders.vue';
import createProvider from './apollo/create-provider';
import './styles';

Vue.config.productionTip = false;
Vue.use(VueApollo);

const components = {
  Leaders,
};

const loadComponent = ({
  el,
  name,
  apollo = {},
  props = {},
  on,
} = {}) => {
  const { uri, tenant, siteId } = apollo;
  if (!uri || !tenant || !siteId) throw new Error('The provided apollo config is invalid.');
  if (!components[name]) throw new Error(`No BaseCMS Management Component found for '${name}'`);
  const Component = components[name];
  new Vue({
    el,
    apolloProvider: createProvider({
      graphqlUri: uri,
      tenantKey: tenant,
      siteId,
    }),
    render: h => h(Component, { props, on }),
  });
};

const fns = { loadComponent };

const leaders = (fn, ...args) => {
  if (typeof fns[fn] === 'function') return fns[fn](...args);
  throw new Error(`No leaders function exists for '${fn}'`);
};

const { isArray } = Array;
const { leadersQueue } = window;

if (isArray(leadersQueue)) {
  leadersQueue.forEach((args) => {
    leaders(...args);
  });
}
window.leaders = leaders;
