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
      const blockName = 'leaders-dropdown';
      const classes = [blockName];
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
      &__bg,
      &__inner-bg,
      &__arrow,
      &__container {
        transition: none;
      }
    }
  }
}
</style>
