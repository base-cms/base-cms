<template>
  <component :is="tag" :class="classNames">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    name: {
      type: String,
      required: true,
    },
    modifiers: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    classNames() {
      const elementName = `pswp__${this.name}`;
      const classNames = [elementName];
      this.modifiers.forEach(mod => classNames.push(`${elementName}--${mod}`));
      return classNames;
    },
  },
};
</script>
