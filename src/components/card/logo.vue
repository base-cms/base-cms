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
@import "../../scss/variables";

.leaders-card {
  &__logo {
    box-sizing: content-box;
    width: $leaders-logo-size + $leaders-logo-shadow-size * 2;
    height: $leaders-logo-size + $leaders-logo-shadow-size * 2;
    background-color: #fff;
    border: 4px solid #fff;
    border-radius: 110px;
    box-shadow: inset 0 0 $leaders-logo-shadow-size rgba(0, 0, 0, .5);
    > img {
      width: $leaders-logo-size;
      height: $leaders-logo-size;
      margin-top: $leaders-logo-shadow-size;
      margin-left: $leaders-logo-shadow-size;
      vertical-align: middle;
    }
  }
}
</style>
