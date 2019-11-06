/* eslint-disable no-new */
import Vue from './vue';
import components from './components';
import EventBus from './event-bus';
import './lazysizes';

const providers = {};

const load = async ({
  el,
  name,
  props,
  on,
} = {}) => {
  if (!el || !name) throw new Error('A Vue component name and element must be provided.');
  const Component = components[name];
  if (!Component) throw new Error(`No Vue component found for '${name}'`);
  new Vue({
    provide: providers[name],
    el,
    render: h => h(Component, { props, on }),
  });
};

const register = async (name, Component, { provide } = {}) => {
  if (!name) throw new Error('A Vue component name must be provided.');
  if (components[name]) throw new Error(`A Vue component already exists for '${name}'`);
  components[name] = Component;
  providers[name] = provide;
};

/**
 * @deprecated Use `load` instead.
 */
const loadComponent = (el, name, props) => {
  load({ el, name, props });
};

/**
 * @deprecated Use `register` instead.
 */
const registerComponent = (name, Component, provide) => {
  register(name, Component, { provide });
};

export default {
  load,
  register,
  loadComponent,
  registerComponent,
  EventBus,
};
