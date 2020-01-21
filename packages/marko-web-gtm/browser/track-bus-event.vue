<template>
  <div
    class="marko-web-gtm-track-bus-event"
    :data-on="on"
    :data-event-name="eventName"
    :data-layer-name="layerName"
    style="display: none;"
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
      default: null,
    },

    /**
     * Whether to clear the data layer after firing the event,
     */
    clearData: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    const { on } = this;
    if (on) {
      const eventName = this.eventName || on;
      this.EventBus.$on(on, (data) => {
        const dataLayer = window[this.layerName];
        if (dataLayer) {
          dataLayer.push({ [eventName]: data, event: eventName });
          if (this.clearData) dataLayer.push({ [eventName]: undefined, event: undefined });
        }
      });
    }
  },
};
</script>
