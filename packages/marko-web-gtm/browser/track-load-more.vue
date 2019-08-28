<template>
  <div class="gtm-track-load-more" />
</template>

<script>
export default {
  inject: ['EventBus'],
  props: {
    name: {
      type: String,
      default: 'dataLayer',
    },
    event: {
      type: String,
      default: 'page_load',
    },
  },
  created() {
    this.EventBus.$on('load-more-in-view', ({ data }) => {
      const dataLayer = window[this.name];
      if (dataLayer) dataLayer.push({ ...data, event: this.event });
    });
  },
};
</script>
