/* eslint-disable no-new */
import Vue from './vue';
import components from './components';
// eslint-disable-next-line no-unused-vars
import lazysizes from './lazysizes';

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

export default {
  loadComponent,
  registerComponent,
};
