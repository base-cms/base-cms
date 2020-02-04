<template>
  <pswp-button
    :modifiers="['fs']"
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
      default: 'Toggle Fullscreen',
    },
  },
};
</script>
