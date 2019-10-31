<template>
  <div class="leaders-card__company-summary">
    <element-html :value="headline" class="leaders-card__headline" />
    <element-html :value="teaser" class="leaders-card__teaser" />
  </div>
</template>

<script>
import ElementHtml from './elements/html.vue';

export default {
  components: { ElementHtml },

  props: {
    headline: {
      type: String,
      default: null,
    },
    teaser: {
      type: String,
      default: null,
    },
  },

  computed: {
    canDisplay() {
      return Boolean(this.headline && this.teaser);
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";
@import "../../scss/mixins";

.leaders-card {
  &__company-summary {
    // @todo change to max-width
    // there is a bug where when card resizes it doesn't change
    width: 380px;
    padding-left: $leaders-card-padding;
    > *:not(:last-child) {
      margin-bottom: 14px;
    }
  }

  &__headline {
    font-size: $leaders-card-headline-font-size;
    font-weight: $leaders-card-headline-font-weight;
    line-height: $leaders-card-headline-line-height;
    @include leaders-max-lines(
      $font-size: $leaders-card-headline-font-size,
      $line-height: $leaders-card-headline-line-height,
      $num: 2,
    );
  }

  &__teaser {
    font-size: $leaders-card-teaser-font-size;
    font-weight: $leaders-card-teaser-font-weight;
    line-height: $leaders-card-teaser-line-height;
    @include leaders-max-lines(
      $font-size: $leaders-card-teaser-font-size,
      $line-height: $leaders-card-teaser-line-height,
      $num: 5,
    );
  }
}
</style>
