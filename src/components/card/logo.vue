<template>
  <a :href="href" class="leaders-card__logo">
    <!-- @todo update this to properly lazyload! -->
    <img
      class="lazyload"
      :src="src"
      :alt="alt"
    >
  </a>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    href: {
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
  &__logo {
    box-sizing: content-box;
    display: block;
    width: $leaders-logo-wrapper-size;
    height: $leaders-logo-wrapper-size;
    margin-bottom: $leaders-card-padding;
    background-color: $leaders-logo-background-color;
    border: $leaders-logo-border-size solid $leaders-logo-background-color;
    border-radius: $leaders-logo-wrapper-size;
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
