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
    companyName: {
      type: String,
      required: true,
    },
  },

  computed: {
    alt() {
      return `${this.companyName} Logo`;
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.leaders-card {
  $wrapper-size: $leaders-logo-size + $leaders-logo-shadow-size * 2;
  &__logo {
    box-sizing: content-box;
    width: $wrapper-size;
    height: $wrapper-size;
    background-color: $leaders-logo-background-color;
    border: $leaders-logo-border-size solid $leaders-logo-background-color;
    border-radius: $wrapper-size;
    box-shadow: inset 0 0 $leaders-logo-shadow-size $leaders-logo-shadow-color;
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
