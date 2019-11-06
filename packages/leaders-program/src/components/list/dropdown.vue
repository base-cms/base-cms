<template>
  <div :class="classNames" :style="styles">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    transitionsDisabled: {
      type: Boolean,
      default: true,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: v => ['horizontal', 'vertical'].includes(v),
    },
    open: {
      type: String,
      default: 'below',
      validator: v => ['above', 'below', 'left', 'right'].includes(v),
    },
  },

  computed: {
    classNames() {
      const blockName = 'leaders-dropdown';
      const classes = [blockName, `${blockName}--${this.direction}`, `${blockName}--open-${this.open}`];
      if (this.transitionsDisabled) classes.push(`${blockName}--transitions-disabled`);
      if (this.isActive) classes.push(`${blockName}--active`);
      return classes;
    },
  },
};
</script>

<style lang="scss">
.leaders-dropdown {
  $self: &;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  transition-duration: .25s;
  transition-property: transform, opacity, -webkit-transform;
  transform: rotateX(-5deg);
  transform-origin: 50% -50px;
  will-change: transform, opacity;

  &--active {
    pointer-events: auto;
    opacity: 1;
    transform: none;
    #{ $self } {
      &__section {
        &--active {
          pointer-events: auto;
        }
      }
    }
  }

  &--transitions-disabled {
    #{ $self } {
      &__section,
      &__background,
      &__inner-background,
      &__arrow,
      &__container {
        transition: none;
      }
    }
  }
}
</style>
