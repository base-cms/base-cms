const LeadersProgram = () => import(/* webpackChunkName: "leaders-program" */ '@base-cms/leaders-program');

export default (Browser) => {
  Browser.regiser('LeadersProgram', LeadersProgram, { withApollo: true });
};
