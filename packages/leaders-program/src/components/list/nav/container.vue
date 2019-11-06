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
