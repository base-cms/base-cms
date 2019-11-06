<template>
  <tag
    :is="tag"
    v-if="name"
    :class="classNames"
    :modifers="modifiers"
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
    transition-duration: 150ms;
    transition-property: fill;
  }

  &--filter-none {
    width: $leaders-icon-filter-size;
    height: $leaders-icon-filter-size;
    margin-right: $leaders-icon-filter-margin;
    svg {
      width: $leaders-icon-filter-size;
      height: $leaders-icon-filter-size;
      fill: $leaders-icon-filter-color;
    }
    &#{ $block } {
      &--active svg {
        fill: $leaders-icon-filter-active-color;
      }
    }
  }

  &--videocam {
    width: $leaders-icon-videocam-size;
    height: $leaders-icon-videocam-size;
    margin-left: $leaders-icon-videocam-margin;
    svg {
      width: $leaders-icon-videocam-size;
      height: $leaders-icon-videocam-size;
      fill: $leaders-icon-videocam-color;
    }
    &#{ $block } {
      &--active svg {
        fill: $leaders-icon-videocam-active-color;
      }
    }
  }

  &--primary-color-light {
    svg {
      fill: $leaders-primary-color-light;
    }
  }
}
</style>
