<template>
  <label :for="id">
    <slot />
    <span v-if="required" class="text-danger">*</span>
  </label>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
