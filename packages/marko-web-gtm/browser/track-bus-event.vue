<template>
  <div
    class="marko-web-gtm-track-bus-event"
    :data-on="on"
    :data-event-name="eventName"
    :data-layer-name="layerName"
  />
</template>

<script>
export default {
  inject: ['EventBus'],
  props: {
    /**
     * The name of the data layer.
     */
    layerName: {
      type: String,
      default: 'dataLayer',
    },

    /**
     * The EventBus event name.
     */
    on: {
      type: String,
      required: true,
    },

    /**
     * The event name to send to GTM.
     */
    eventName: {
      type: String,
      required: true,
    },
  },
  created() {
    const { on, eventName } = this;
    if (on && eventName) {
      this.EventBus.$on(on, (...args) => {
        const dataLayer = window[this.layerName];
        if (dataLayer) dataLayer.push({ eventArgs: args, event: eventName });
      });
    }
  },
};
</script>
