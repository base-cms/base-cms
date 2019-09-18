/* eslint-disable no-new */
import Vue from './vue';
import components from './components';
import EventBus from './event-bus';
import './lazysizes';

const providers = {};

const loadComponent = (el, name, props) => {
  const Component = components[name];
  if (!Component) throw new Error(`No Vue component found for '${name}'`);
  new Vue({
    provide: providers[name],
    el,
    render: h => h(Component, { props }),
  });
};

const registerComponent = (name, Component, provide) => {
  if (components[name]) throw new Error(`A Vue component already exists for '${name}'`);
  components[name] = Component;
  providers[name] = provide;
};

export default {
  loadComponent,
  registerComponent,
  EventBus,
};
