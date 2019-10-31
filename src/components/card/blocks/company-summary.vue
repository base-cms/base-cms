<template>
  <div class="leaders-company-summary">
    <a v-if="headline" :href="profileHref" class="leaders-company-summary__headline">
      <element-html :value="headline" />
    </a>
    <a v-if="teaser" :href="profileHref" class="leaders-company-summary__teaser">
      <element-html :value="teaser" />
    </a>
  </div>
</template>

<script>
import ElementHtml from '../../common/html.vue';

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
    profileHref: {
      type: String,
      required: true,
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
@import "../../../scss/variables";
@import "../../../scss/mixins";

.leaders-company-summary {
  // @todo change to max-width
  // there is a bug where when card resizes it doesn't change
  width: 380px;
  padding-left: $leaders-card-padding;
  > *:not(:last-child) {
    margin-bottom: 14px;
  }

  &__headline {
    font-size: $leaders-card-headline-font-size;
    font-weight: $leaders-card-headline-font-weight;
    line-height: $leaders-card-headline-line-height;
    color: $leaders-card-headline-color;
    @include leaders-max-lines(
      $font-size: $leaders-card-headline-font-size,
      $line-height: $leaders-card-headline-line-height,
      $num: 3,
    );

    &:hover {
      color: $leaders-card-headline-hover-color;
      text-decoration: none;
    }
  }

  &__teaser {
    font-size: $leaders-card-teaser-font-size;
    font-weight: $leaders-card-teaser-font-weight;
    line-height: $leaders-card-teaser-line-height;
    color: $leaders-card-teaser-color;
    @include leaders-max-lines(
      $font-size: $leaders-card-teaser-font-size,
      $line-height: $leaders-card-teaser-line-height,
      $num: 5,
    );

    &:hover {
      color: $leaders-card-teaser-hover-color;
      text-decoration: none;
    }
  }
}
</style>
