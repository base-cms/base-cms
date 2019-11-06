<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'ul',
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: v => ['horizontal', 'vertical'].includes(v),
    },
  },

  computed: {
    classes() {
      const blockName = 'leaders-nav';
      const classes = [blockName, `${blockName}--${this.direction}`];
      return classes;
    },
  },
};
</script>

<style lang="scss">
.leaders-nav {
  display: flex;
  padding: 0;
  margin: 0;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }
}
</style>
