<template>
  <div class="leaders-dropdown__container" :style="styles">
    <slot />
  </div>
</template>

<script>
import pointerEvents from '../pointer-events';

const pointerEvent = pointerEvents();

export default {
  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
  },

  mounted() {
    this.addEventListeners();
  },

  beforeDestroy() {
    this.removeEventListeners();
  },

  methods: {
    addEventListeners() {
      const { $el } = this;
      $el.addEventListener(pointerEvent.enter, this.emitPointerEnter);
      $el.addEventListener(pointerEvent.end, this.emitPointerEnd);
      $el.addEventListener(pointerEvent.leave, this.emitPointerLeave);
    },

    removeEventListeners() {
      const { $el } = this;
      $el.removeEventListener(pointerEvent.enter, this.emitPointerEnter);
      $el.removeEventListener(pointerEvent.end, this.emitPointerEnd);
      $el.removeEventListener(pointerEvent.leave, this.emitPointerLeave);
    },

    emitPointerEnter(event) {
      this.$emit('pointer-enter', { element: this.$el, event });
    },

    emitPointerEnd(event) {
      this.$emit('pointer-end', { element: this.$el, event });
    },

    emitPointerLeave(event) {
      this.$emit('pointer-leave', { element: this.$el, event });
    },
  },
};
</script>
