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
    top: 0;
    left: 0;
    overflow: hidden;
    background-color: #fff;
    transform: translateX(0);
    transform-origin: 0 0;

  }

  &__inner-background {
    background-color: $leaders-dropdown-background-border-color;
  }

  &__background,
  &__inner-background {
    position: absolute;
    will-change: height, width, transform;
    transition-duration: .25s;
    transition-property: height, width, transform, -webkit-transform;
  }

  &--open-below {
    #{ $self } {
      &__background {
        box-shadow: $leaders-dropdown-background-box-shadow-below;
      }
      &__inner-background {
        top: 0;
        right: 0;
        left: 0;
        height: $leaders-dropdown-background-border-size;
      }
    }
  }

  &--open-above {
    #{ $self } {
      &__background {
        box-shadow: $leaders-dropdown-background-box-shadow-above;
      }
      &__inner-background {
        right: 0;
        bottom: 0;
        left: 0;
        height: $leaders-dropdown-background-border-size;
      }
    }
  }

  &--open-left {
    #{ $self } {
      &__background {
        box-shadow: $leaders-dropdown-background-box-shadow-left;
      }
      &__inner-background {
        top: 0;
        right: 0;
        bottom: 0;
        width: $leaders-dropdown-background-border-size;
      }
    }
  }

  &--open-right {
    #{ $self } {
      &__background {
        box-shadow: $leaders-dropdown-background-box-shadow-right;
      }
      &__inner-background {
        top: 0;
        bottom: 0;
        left: 0;
        width: $leaders-dropdown-background-border-size;
      }
    }
  }
}
</style>
