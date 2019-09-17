import MenuToggleButton from './menu-toggle-button.vue';
import ContactUsForm from './contact-us-form.vue';

export default (Browser) => {
  Browser.registerComponent('DefaultThemeMenuToggleButton', MenuToggleButton);
  Browser.registerComponent('DefaultThemeContactUsForm', ContactUsForm);
};
