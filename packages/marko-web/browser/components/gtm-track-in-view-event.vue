<template>
  <div v-bind:id="elementId" class="lazyload" v-bind:data-expand="expand"></div>
</template>

<script>
import $ from '../jquery';

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
    vars: Object,
  },
  computed: {
    elementId() {
      return `gtm-track-event-${Date.now()}`
    },
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
  created() {
    document.addEventListener('lazybeforeunveil', this.lazyload.bind(this));
  },
}
</script>
