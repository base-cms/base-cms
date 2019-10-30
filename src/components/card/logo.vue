<template>
  <div class="leaders-card__logo">
    <!-- @todo update this to properly lazyload! -->
    <img
      class="lazyload"
      :src="src"
      :alt="alt"
    >
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.leaders-card {
  &__logo {
    > img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
