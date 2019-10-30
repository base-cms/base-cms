<template>
  <component
    :is="tag"
    :data-dropdown-index="index"
    :class="classNames"
    :aria-expanded="isActive"
    aria-haspopup="true"
  >
    <slot />
  </component>
</template>

<script>
import pointerEvents from '../pointer-events';

const pointerEvent = pointerEvents();

export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    activeIndex: {
      type: Number,
      default: null,
    },
    tag: {
      type: String,
      default: 'button',
    },
  },

  computed: {
    isActive() {
      return this.index === this.activeIndex;
    },
    classNames() {
      const elementName = 'leaders-nav__link';
      const classes = [elementName];
      if (this.isActive) classes.push(`${elementName}--active`);
      return classes;
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
      this.emitEvent('focusin', event);
    },

    emitPointerEnter(event) {
      this.emitEvent('pointer-enter', event);
    },

    emitPointerEnd(event) {
      this.emitEvent('pointer-end', event);
    },

    emitPointerLeave(event) {
      this.emitEvent('pointer-leave', event);
    },

    emitEvent(name, event) {
      this.$emit(name, {
        index: this.index,
        element: this.$el,
        event,
      });
    },
  },
};
</script>

<style lang="scss">
.leaders-nav {
  &__link {
    display: inline-block;
    padding: 10px 15px;
    margin: 0;
    font-size: 17px;
    font-weight: 500;
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

    &:focus,
    &:active {
      outline: none;
    }

    &--active {
      color: #6c757d;
    }
  }
}
</style>
