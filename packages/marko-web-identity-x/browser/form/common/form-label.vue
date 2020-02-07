<template>
  <label>
    <slot />
    <span v-if="required" class="ml-1 text-danger">*</span>
  </label>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
