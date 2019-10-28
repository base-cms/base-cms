<template>
  <div :class="classNames">
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
  },

  computed: {
    classNames() {
      const elementName = 'leaders__dropdown';
      const classes = [elementName];
      if (this.transitionsDisabled) classes.push(`${elementName}--transitions-disabled`);
      if (this.isActive) classes.push(`${elementName}--active`);
      return classes;
    },
  },
};
</script>

<style lang="scss">
.leaders {
  $self: &;

  &__dropdown {
    position: absolute;
    top: 50px;
    right: 0;
    left: 0;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition-duration: .25s;
    transition-property: transform, opacity, -webkit-transform;
    transform: rotateX(-15deg);
    transform-origin: 50% -50px;
    will-change: transform, opacity;

    &--active {
      pointer-events: auto;
      opacity: 1;
      transform: none;
      #{ $self } {
        &__dropdown-section {
          &--active {
            pointer-events: auto;
          }
        }
      }
    }

    &--transitions-disabled {
      #{ $self } {
        &__dropdown-section,
        &__dropdown-bg,
        &__dropdown-inner-bg,
        &__arrow,
        &__dropdown-container {
          transition: none;
        }
      }
    }
  }
}
</style>
