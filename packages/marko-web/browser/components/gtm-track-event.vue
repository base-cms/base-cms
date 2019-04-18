<template>
</template>

<script>
import $ from '../jquery';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    strict: {
      type: Boolean,
      default: false,
    },
    dataAttr: {
      type: String,
      default: 'context',
    },
    reset: {
      type: Boolean,
      default: true,
    },
    vars: Object,
  },
  methods: {
    getContext() {
      const { dataAttr } = this;
      return $(this.$el).closest(`[data-${dataAttr}]`).data(dataAttr);
    },
    resetDataLayer() {
      if (!this.reset) return;
      const { google_tag_manager: gtm } = window;
      if (gtm) Object.keys(gtm).filter(k => /^GTM-/.test(k)).forEach(id => gtm[id].dataLayer.reset());
    },
  },
  mounted() {
    const context = this.getContext();
    if (this.strict && (!context && !this.vars)) return;
    const { dataLayer } = window;
    if (!dataLayer) return;
    this.resetDataLayer();
    dataLayer.push({ event: this.name, ...this.vars, ...context });
  },
}
</script>
