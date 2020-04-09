import DefaultForm from './default-form.vue';

export default (Browser, { component, mountPoint } = {}) => {
  const InquiryForm = component || DefaultForm;
  Browser.registerComponent('InquiryForm', InquiryForm, { mountPoint });
};
