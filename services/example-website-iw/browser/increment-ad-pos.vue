<template>
  <div id="lazarus-increment-ad-pos" style="display: none;" />
</template>

<script>
import incrementPos from '../server/utils/gam/increment-pos';

export default {
  inject: ['EventBus'],

  props: {
    /**
     * The target GAM slot element ID.
     * Example: `gpt-ad-lb-top` or `div-gpt-ad-1573493345947-108`
     */
    slotId: {
      type: String,
      required: true,
    },
  },

  created() {
    this.EventBus.$on('gam-before-ad-refresh', (slot) => {
      const slotElementId = slot.getSlotElementId();
      if (slotElementId === this.slotId && slot.getTargetingKeys().includes('pos')) {
        const [pos] = slot.getTargetingMap().pos;
        const newPos = incrementPos({ pos, inc: 1 });
        const element = document.getElementById(this.slotId);
        slot.setTargeting('pos', [newPos]);
        element.setAttribute('data-gam-targeting', JSON.stringify(slot.getTargetingMap()));
      }
    });
  },
};
</script>
