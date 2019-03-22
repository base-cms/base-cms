/* eslint-disable no-new */
import Vue from 'vue';
import LoadMoreButton from './load-more-button.vue';

// @todo This entire file must move to core
// Must also determine how to load both the core and the site clientjs

const components = {
  LoadMoreButton,
};

const loadComponent = (el, name, props) => {
  const Component = components[name];
  if (!Component) throw new Error(`No Vue component found for '${name}'`);
  new Vue({
    el,
    render: h => h(Component, { props }),
  });
};

const registerComponent = (name, Component) => {
  if (components[name]) throw new Error(`A Vue component already exists for '${name}'`);
  components[name] = Component;
};

export {
  loadComponent,
  registerComponent,
};
