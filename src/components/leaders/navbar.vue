<template>
  <component :is="tag" class="leaders__navbar">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'nav',
    },
  },
};
</script>

<style lang="scss">
.leaders {
  &__navbar {
    display: flex;
  }
}
</style>
