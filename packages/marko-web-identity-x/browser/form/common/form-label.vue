<template>
  <label>
    <slot />
    <strong v-if="required" class="text-danger">*</strong>
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
