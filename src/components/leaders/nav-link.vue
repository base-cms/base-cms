<template>
  <component
    :is="tag"
    :data-dropdown-id="dropdownId"
    class="leaders__nav-link"
    aria-haspopup="true"
    aria-expanded="false"
  >
    <slot />
  </component>
</template>

<script>
import pointerEvents from './pointer-events';

const pointerEvent = pointerEvents();

export default {
  props: {
    dropdownId: {
      type: [String, Number],
      required: true,
    },
    tag: {
      type: String,
      default: 'button',
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
      $el.addEventListener('focusin', this.emitFocusIn);
      $el.addEventListener(pointerEvent.enter, this.emitPointerEnter);
      $el.addEventListener(pointerEvent.end, this.emitPointerEnd);
      $el.addEventListener(pointerEvent.leave, this.emitPointerLeave);
    },

    removeEventListeners() {
      const { $el } = this;
      $el.removeEventListener('focusin', this.emitFocusIn);
      $el.removeEventListener(pointerEvent.enter, this.emitPointerEnter);
      $el.removeEventListener(pointerEvent.end, this.emitPointerEnd);
      $el.removeEventListener(pointerEvent.leave, this.emitPointerLeave);
    },

    emitFocusIn(event) {
      this.$emit('focusin', this.$el, event);
    },

    emitPointerEnter(event) {
      this.$emit('pointer-enter', this.$el, event);
    },

    emitPointerEnd(event) {
      this.$emit('pointer-end', this.$el, event);
    },

    emitPointerLeave(event) {
      this.$emit('pointer-leave', this.$el, event);
    },
  },
};
</script>

<style lang="scss">
.leaders {
  &__nav-link {
    display: inline-block;
    height: 50px;
    padding: 0 10px;
    margin: 0;
    font-size: 17px;
    font-weight: 500;
    line-height: 50px;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    background: none;
    border: none;
    outline: none;
    transition: color .1s ease;
    -webkit-tap-highlight-color: transparent;
    > * {
      position: relative;
      display: block;
    }
  }
}
</style>
