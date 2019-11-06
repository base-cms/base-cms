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
