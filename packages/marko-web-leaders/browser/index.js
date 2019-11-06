const LeadersProgram = () => import(/* webpackChunkName: "leaders-program" */ '@base-cms/leaders-program');

export default (Browser) => {
  Browser.register('LeadersProgram', LeadersProgram, { withApollo: true });
};
