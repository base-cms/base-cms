<template>
  <div class="leaders-dropdown__background" :style="styles">
    <div class="leaders-dropdown__inner-background" :style="innerStyles" />
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
    innerStyles: {
      type: Object,
      default: () => ({}),
    },
  },
};
/* eslint-disable */
</script>

<style lang="scss">
@import "../../../scss/variables";

.leaders-dropdown {
  $self: &;

  &__background {
    overflow: hidden;
    transform: translateX(0);
    transform-origin: 0 0;
  }

  &__inner-background {
    right: 0;
    height: 1000px;
  }

  &__background,
  &__inner-background {
    position: absolute;
    top: 0;
    left: 0;
    will-change: height, width, transform;
    transition-duration: .25s;
    transition-property: height, width, transform, -webkit-transform;
  }

  $border: 9px solid #d656b0;

  // box-shadow: offset-x offset-y blur-radius spread-radius color
  &--open-below {
    #{ $self } {
      &__background {
        border-top: $border;
        box-shadow: $leaders-dropdown-background-box-shadow-below;
      }
    }
  }

  &--open-above {
    #{ $self } {
      &__background {
        border-bottom: $border;
        box-shadow: $leaders-dropdown-background-box-shadow-above;
      }
    }
  }

  &--open-left {
    #{ $self } {
      &__background {
        border-right: $border;
        box-shadow: $leaders-dropdown-background-box-shadow-left;
      }
    }
  }

  &--open-right {
    #{ $self } {
      &__background {
        border-left: $border;
        box-shadow: $leaders-dropdown-background-box-shadow-right;
      }
    }
  }
}
</style>
