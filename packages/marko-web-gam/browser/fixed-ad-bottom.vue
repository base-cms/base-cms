<template>
  <div
    v-if="canDisplay"
    :class="blockClasses"
  >
    <div :class="containerClasses">
      <div :class="backgroundClasses" />
      <div :id="id" />
      <button
        v-if="closeable"
        :class="buttonClasses"
        title="Close Advertisement"
        @click="close"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';

const buildSizeMapping = sm => sm
  .reduce((map, s) => map.addSize(s.viewport, s.size), window.googletag.sizeMapping()).build();
const block = 'marko-web-gam-fixed-ad-bottom';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
      default: () => [[970, 90], [970, 66], [728, 90], [320, 50], [300, 50], [300, 100]],
    },
    sizeMapping: {
      type: Array,
      default: () => [
        { viewport: [980, 0], size: [[970, 90], [970, 66], [728, 90]] },
        { viewport: [750, 0], size: [728, 90] },
        { viewport: [320, 0], size: [[300, 50], [320, 50], [300, 100]] },
      ],
    },
    // in seconds
    refreshInterval: {
      type: Number,
      default: 60,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    scrollOffset: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      handler: null,
      visible: false,
      initialized: false,
    };
  },
  computed: {
    intervalMs() {
      const value = Number(this.refreshInterval);
      if (!value) return 0;
      return value * 1000;
    },
    refreshable() {
      return this.intervalMs > 0;
    },
    canDisplay() {
      if (window.googletag) return true;
      return false;
    },
    blockClasses() {
      const classes = [block];
      if (this.visible) {
        classes.push(`${block}--visible`);
        return classes;
      }
      return classes;
    },
    containerClasses() {
      return `${block}__container`;
    },
    buttonClasses() {
      return `${block}__close`;
    },
    backgroundClasses() {
      return `${block}__background`;
    },
  },
  mounted() {
    if (this.canDisplay) {
      const controller = new ScrollMagic.Controller();
      const scene = new ScrollMagic.Scene({ offset: this.scrollOffset });
      scene.on('enter', () => {
        if (!this.initialized) this.init();
      });
      controller.addScene(scene);
    }
  },
  beforeDestroy() {
    if (this.canDisplay) clearTimeout(this.handler);
  },
  methods: {
    init() {
      const { googletag } = window;
      googletag.cmd.push(() => {
        googletag.pubads().addEventListener('slotRenderEnded', this.display);
        if (this.refreshable) googletag.pubads().addEventListener('impressionViewable', this.refresh);
        googletag
          .defineSlot(this.path, this.size, this.id)
          .defineSizeMapping(buildSizeMapping(this.sizeMapping))
          .addService(googletag.pubads());
        googletag.display(this.id);
      });
      this.initialized = true;
    },
    close() {
      this.visible = false;
      clearTimeout(this.handler);
    },
    refresh({ slot }) {
      if (slot.getSlotElementId() === this.id) {
        this.handler = setTimeout(() => window.googletag.pubads().refresh([slot]), this.intervalMs);
      }
    },
    display({ slot, isEmpty }) {
      if (slot.getSlotElementId() === this.id && !isEmpty) this.visible = true;
    },
  },
};
</script>
