<template>
  <div class="leaders-dropdown__arrow" :style="styles" />
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
};
/* eslint-disable */
</script>

<style lang="scss">
.leaders-dropdown {
  $self: &;
  &__arrow {
    position: absolute;
    top: -6px;
    left: 0;
    width: 12px;
    height: 12px;
    margin: 0 0 0 -6px;
    background: #d656b0;
    transition-duration: .25s;
    transition-property: transform, -webkit-transform;
    transform: rotate(45deg);
    will-change: transform;
  }

  // box-shadow: offset-x offset-y blur-radius spread-radius color
  &--open-below {
    #{ $self } {
      &__arrow {
        box-shadow: -3px -3px 5px rgba(82, 95, 127, .04);
      }
    }
  }

  &--open-above {
    #{ $self } {
      &__arrow {
        box-shadow: 3px 3px 5px rgba(82, 95, 127, .04);
      }
    }
  }

  &--open-left {
    #{ $self } {
      &__arrow {
        box-shadow: -3px -3px 5px rgba(82, 95, 127, .04);
      }
    }
  }

  &--open-right {
    #{ $self } {
      &__arrow {
        box-shadow: -3px -3px 5px rgba(82, 95, 127, .04);
      }
    }
  }
}
</style>
