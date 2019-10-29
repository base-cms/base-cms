<template>
  <div class="content">
    <p>This should have content for {{ label }}</p>
    <p>Let's make it...</p>
    <p><strong>Bigger!</strong></p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.content {
  padding: 30px;
}
</style>
