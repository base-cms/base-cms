const DefaultForm = () => import(/* webpackChunkName: "inquiry-default-form" */ './default-form.vue');

export default (Browser, { component, mountPoint } = {}) => {
  const InquiryForm = component || DefaultForm;
  Browser.register('InquiryForm', InquiryForm, { mountPoint });
};
