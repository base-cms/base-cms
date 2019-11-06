<template>
  <div class="leaders-dropdown__arrow" :style="styles" />
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
