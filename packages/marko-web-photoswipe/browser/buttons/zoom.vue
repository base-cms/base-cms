<template>
  <pswp-button
    :modifiers="['zoom']"
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
      default: 'Zoom In/Out',
    },
  },
};
</script>
