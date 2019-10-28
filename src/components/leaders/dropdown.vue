<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
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

    &--transitions-disabled {
      #{ $self } {
        &__dropdown-section,
        &__background,
        &__background-alt,
        &__arrow,
        &__dropdown-container {
          transition: none;
        }
      }
    }
  }
}
</style>
