<template>
  <div :id="elementId" class="lazyload" :data-expand="expand" />
</template>

<script>
export default {
  props: {
    name: {
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
      const { dataLayer } = window;
      if (!dataLayer) return;
      const data = { event: this.name, ...this.vars };
      dataLayer.push(data);
    },
  },
};
</script>
