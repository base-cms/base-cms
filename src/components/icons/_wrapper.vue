<template>
  <tag
    :is="tag"
    v-if="name"
    :class="classNames"
  >
    <slot />
  </tag>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    className: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: 'span',
    },
  },
  computed: {
    classNames() {
      return ['leaders-icon', `leaders-icon--${this.name}`, this.className];
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.leaders-icon {
  display: inline-block;
  width: $leaders-icon-size;
  height: $leaders-icon-size;
  color: $leaders-icon-color;

  svg {
    width: $leaders-icon-size;
    height: $leaders-icon-size;
    overflow: hidden;
    vertical-align: middle;
    transition: fill 250ms ease;
    fill: currentColor;
  }

  &--filter-none {
    width: $leaders-icon-filter-size;
    height: $leaders-icon-filter-size;
    margin-right: $leaders-icon-filter-margin;
    color: $leaders-icon-filter-color;
    svg {
      width: $leaders-icon-filter-size;
      height: $leaders-icon-filter-size;
    }
  }

  &--videocam {
    width: $leaders-icon-videocam-size;
    height: $leaders-icon-videocam-size;
    margin-left: $leaders-icon-videocam-margin;
    color: $leaders-icon-videocam-color;
    svg {
      width: $leaders-icon-videocam-size;
      height: $leaders-icon-videocam-size;
    }
  }
}
</style>
