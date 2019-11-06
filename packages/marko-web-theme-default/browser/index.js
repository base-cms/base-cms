const MenuToggleButton = () => import(/* webpackChunkName: "theme-menu-toggle-button" */ './menu-toggle-button.vue');

export default (Browser) => {
  Browser.register('DefaultThemeMenuToggleButton', MenuToggleButton);
};
