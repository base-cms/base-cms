const MenuToggleButton = () => import(/* webpackChunkName: "theme-menu-toggle-button" */ './menu-toggle-button.vue');

export default (Browser) => {
  Browser.registerComponent('DefaultThemeMenuToggleButton', MenuToggleButton);
};
