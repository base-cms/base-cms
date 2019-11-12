const LeadersProgram = () => import(/* webpackChunkName: "leaders-program" */ '@base-cms/leaders-program');

export default (Browser) => {
  const { EventBus } = Browser;
  Browser.register('LeadersProgram', LeadersProgram, {
    withApollo: true,
    on: { action: EventBus.$emit },
  });
};
