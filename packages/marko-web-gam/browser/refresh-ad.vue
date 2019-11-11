<template>
  <div :id="elementId" style="display: none;" />
</template>

<script>
export default {
  inject: ['EventBus'],

  props: {
    /**
     * The EventBus event name to listen to.
     * When this event fires, the ad will be refreshed.
     * Example event name: `load-more-in-view`
     */
    on: {
      type: String,
      required: true,
    },

    /**
     * The target GAM slot element ID.
     * This will be the refreshed element.
     * Example: `gpt-ad-lb-top` or `div-gpt-ad-1573493345947-108`
     */
    slotId: {
      type: String,
      required: true,
    },

    /**
     * The minimum percentage that the slot must be in-view
     * in order to trigger the refresh.
     */
    minInViewPercentage: {
      type: Number,
      default: 75,
    },
  },

  data: () => ({
    slot: null,
    inViewPercentage: 0,
  }),

  computed: {
    elementId() {
      return `marko-web-gam-refresh-ad-${Date.now()}`;
    },
    canAddListeners() {
      if (!window.googletag) return false;
      return Boolean(this.on && this.slotId);
    },
    canRefresh() {
      return Boolean(this.slot && (this.inViewPercentage >= this.minInViewPercentage));
    },
  },

  created() {
    this.addVisibilityListener();
    this.addRefreshListener();
  },

  methods: {
    addVisibilityListener() {
      if (!this.canAddListeners) return;
      const { googletag } = window;
      googletag.cmd.push(() => {
        googletag.pubads().addEventListener('slotVisibilityChanged', (event) => {
          const { slot, inViewPercentage } = event;
          const slotElementId = slot.getSlotElementId();
          if (slotElementId === this.slotId) {
            this.inViewPercentage = inViewPercentage;
            this.slot = slot;
          }
        });
      });
    },

    addRefreshListener() {
      if (!this.canAddListeners) return;
      this.EventBus.$on(this.on, () => {
        if (this.canRefresh) window.googletag.pubads().refresh([this.slot]);
      });
    },
  },
};
</script>
