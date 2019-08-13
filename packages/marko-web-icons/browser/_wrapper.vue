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
import createClasses from '../utils/create-classes';

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
    class: {
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
      const { name, modifiers, blockName } = this;
      return createClasses({
        iconName: name,
        blockName,
        modifiers,
        className: this.class,
      });
    },
  },
};
</script>
