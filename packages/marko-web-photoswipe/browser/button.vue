<template>
  <pswp-element
    tag="button"
    name="button"
    type="button"
    :modifiers="modifiers"
  />
</template>

<script>
import PswpElement from './element.vue';

export default {
  components: { PswpElement },
  props: {
    modifiers: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
