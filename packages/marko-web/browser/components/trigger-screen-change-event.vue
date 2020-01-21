<template>
  <div :id="elementId" style="display: none;" />
</template>

<script>
import EventBus from '../event-bus';
import elementId from './element-id';
import $ from '../jquery';

export default {
  props: {
    multiplier: {
      type: Number,
      default: 1.35,
    },
    screenHeight: {
      type: Number,
      default: 1000,
    },
    scrollTimeoutMs: {
      type: Number,
      default: 250,
    },
    eventName: {
      type: String,
      default: 'screen_change',
    },
  },

  data: () => ({
    activeScreen: 1,
    didScroll: true,
  }),

  computed: {
    elementId() {
      return elementId(`${this.eventName}-event`);
    },
    maxHeight() {
      const { screenHeight } = this;
      if (!screenHeight) return window.innerHeight;
      return screenHeight;
    },
  },

  watch: {
    activeScreen(current, old) {
      const direction = current < old ? 'Up' : 'Down';
      this.trigger(direction);
    },
  },

  mounted() {
    $(window).on('scroll', () => {
      this.didScroll = true;
    });
    setInterval(this.handleScroll, this.scrollTimeoutMs);
  },

  beforeDestroy() {
    clearInterval(this.handleScroll);
  },

  methods: {
    getScrollY() {
      return window.pageYOffset || window.scrollY;
    },

    handleScroll() {
      if (this.didScroll) {
        this.setActiveScreen();
        this.didScroll = false;
      }
    },

    setActiveScreen() {
      const screenHeight = this.maxHeight * this.multiplier;
      this.activeScreen = Math.floor(this.getScrollY() / screenHeight) + 1;
    },

    trigger(direction) {
      EventBus.$emit(this.eventName, {
        direction,
        activeScreen: this.activeScreen,
        scrollY: this.getScrollY(),
        maxHeight: this.maxHeight,
        multiplier: this.multiplier,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
      });
    },
  },
};
</script>
