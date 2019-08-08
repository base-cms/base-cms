<template>
  <div :id="elementId" class="lazyload" :data-expand="expand" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'dataLayer',
    },
    event: {
      type: String,
      required: true,
    },
    expand: {
      type: Number,
      default: -100,
    },
    vars: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    elementId() {
      return `gtm-track-event-${Date.now()}`;
    },
  },
  created() {
    document.addEventListener('lazybeforeunveil', this.lazyload.bind(this));
  },
  methods: {
    lazyload({ target }) {
      if (target.id === this.elementId) this.track();
    },
    track() {
      const dataLayer = window[this.name];
      if (!dataLayer) return;
      const data = { event: this.event, ...this.vars };
      dataLayer.push(data);
    },
  },
};
</script>
