<template>
  <common-link
    :class="classes"
    :href="href"
    :target="target"
  >
    <slot />
  </common-link>
</template>

<script>
import CommonLink from './link.vue';

export default {
  components: { CommonLink },

  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'primary',
      validator: v => ['primary', 'accent'].includes(v),
    },
    block: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      const blockName = 'leaders-button-link';
      const classes = [blockName, `${blockName}--${this.type}`];
      if (this.block) classes.push(`${blockName}--block`);
      return classes;
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.leaders-button-link {
  $block: &;
  display: inline-block;
  padding: $leaders-button-link-padding-x $leaders-button-link-padding-y;
  font-size: $leaders-button-link-font-size;
  font-weight: $leaders-button-link-font-weight;
  line-height: $leaders-button-link-line-height;
  text-align: center;
  vertical-align: middle;
  border-radius: $leaders-button-link-border-radius;

  & + #{ $block } {
    margin-top: $leaders-button-link-margin;
  }

  &--primary {
    color: $leaders-button-link-primary-color;
    background-color: $leaders-button-link-primary-bg-color;
    border: 1px solid $leaders-button-link-primary-color;
    &:hover {
      color: $leaders-button-link-primary-color;
      text-decoration: none;
    }
  }

  &--accent {
    color: $leaders-button-link-accent-color;
    background-color: $leaders-button-link-accent-bg-color;
    border: 1px solid $leaders-button-link-accent-bg-color;
    &:hover {
      color: $leaders-button-link-accent-color;
      text-decoration: none;
    }
  }

  &--block {
    display: block;
    width: 100%;
  }
}
</style>
