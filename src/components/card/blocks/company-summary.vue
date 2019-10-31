<template>
  <div v-if="canDisplay" class="leaders-company-summary">
    <a
      v-if="headline"
      :href="profileHref"
      :title="linkTitle"
      class="leaders-company-summary__headline"
    >
      <element-html :value="headline" />
    </a>
    <a
      v-if="teaser"
      :href="profileHref"
      :title="linkTitle"
      class="leaders-company-summary__teaser"
    >
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

  data: () => ({
    linkTitle: 'View Company Profile',
  }),

  computed: {
    canDisplay() {
      return Boolean(this.headline || this.teaser);
    },
  },
};
</script>

<style lang="scss">
@import "../../../scss/variables";
@import "../../../scss/mixins";

.leaders-company-summary {
  width: 350px;

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

  &__headline + &__teaser {
    margin-top: 14px;
  }
}
</style>
