<template>
  <span
    v-if="name"
    :class="classNames"
  >
    <slot />
  </span>
</template>

<script>
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
  },
  computed: {
    classNames() {
      const { name, modifiers: mods, blockName } = this;
      return [blockName, `${blockName}--${name}`, ...mods.map(mod => `${blockName}--${mod}`), this.class];
    },
  },
};
</script>
