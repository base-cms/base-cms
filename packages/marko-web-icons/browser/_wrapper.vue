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
import createClasses from './create-classes';

export default {
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    blockName: {
      type: String,
      default: 'icon',
    },
    className: {
      type: String,
      default: null,
    },
    modifiers: {
      type: Array,
      default: () => ([]),
    },
    tag: {
      type: String,
      default: 'span',
    },
  },
  computed: {
    classNames() {
      return createClasses({
        iconName: this.name,
        blockName: this.blockName,
        modifiers: this.modifiers,
        className: this.className,
      });
    },
  },
};
</script>
