<template>
  <pswp-button
    :modifiers="['close']"
    :title="title"
  />
</template>

<script>
import PswpButton from '../button.vue';

export default {
  components: { PswpButton },
  props: {
    title: {
      type: String,
      default: 'Close (Esc)',
    },
  },
};
</script>
