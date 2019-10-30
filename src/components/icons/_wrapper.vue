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
    modifiers: {
      type: Array,
      default: () => [],
    },
    tag: {
      type: String,
      default: 'span',
    },
  },
  computed: {
    classNames() {
      const blockName = 'leaders-icon';
      return [
        blockName,
        `${blockName}--${this.name}`,
        ...this.modifiers.map(mod => `${blockName}--${mod}`),
      ];
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.leaders-icon {
  $block: &;
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
    &#{ $block } {
      &--active {
        color: $leaders-icon-filter-active-color;
      }
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
    &#{ $block } {
      &--active {
        color: $leaders-icon-videocam-active-color;
      }
    }
  }
}
</style>
