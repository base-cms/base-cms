<template>
  <div :class="classNames">
    <card-header>
      <div class="leaders-card__company-details">
        <logo
          v-if="logo.src"
          :src="logo.src"
          :alt="logo.alt"
        />
      </div>
      <div class="leaders-card__company-body">
        <div
          v-if="company.productSummary"
          class="leaders-card__product-summary"
          v-html="company.productSummary"
        />
        <div
          v-if="company.productSummary"
          class="leaders-card__teaser"
          v-html="company.teaser"
        />
      </div>
    </card-header>
    <card-body>
      <slot name="body" />
    </card-body>
  </div>
</template>

<script>
import { getAsObject } from '@base-cms/object-path';
import CardBody from './body.vue';
import CardHeader from './header.vue';
import Logo from './logo.vue';

export default {
  components: { CardBody, CardHeader, Logo },

  props: {
    company: {
      type: Object,
      default: () => ({}),
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    logo() {
      return getAsObject(this.company, 'primaryImage');
    },
    classNames() {
      const blockName = 'leaders-card';
      const classes = [blockName];
      if (this.isActive) classes.push(`${blockName}--active`);
      return classes;
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";
@import "../../scss/mixins";

.leaders-card {
  $block: &;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;

  &__header {
    display: flex;
    flex-direction: row;
    padding: $leaders-card-header-padding;
    color: $leaders-card-header-color;
    background-color: $leaders-card-initial-bg-color;
    opacity: $leaders-card-initial-opacity;
    transition-duration: $leaders-card-transition-duration;
    transition-property: $leaders-card-transition-property;
  }

  &__body {
    flex: 1 1 auto;
    padding: $leaders-card-body-padding;
    color: $leaders-card-body-color;
    background-color: $leaders-card-initial-bg-color;
    opacity: $leaders-card-initial-opacity;
    transition-duration: $leaders-card-transition-duration;
    transition-property: $leaders-card-transition-property;
  }

  &__company-details {
    padding-right: $leaders-card-padding;
  }

  &__company-body {
    // @todo change to max-width
    // there is a bug where when card resizes it doesn't change
    width: 380px;
    padding-left: $leaders-card-padding;
    > *:not(:last-child) {
      margin-bottom: 14px;
    }
  }

  &__company-details + &__company-body {
    border-left: 1px solid $leaders-card-header-hr-color;
  }

  &__product-summary {
    font-size: $leaders-card-product-summary-font-size;
    font-weight: $leaders-card-product-summary-font-weight;
    line-height: $leaders-card-product-summary-line-height;
    @include leaders-max-lines(
      $font-size: $leaders-card-product-summary-font-size,
      $line-height: $leaders-card-product-summary-line-height,
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

  &--active {
    #{ $block } {
      &__header {
        background-color: $leaders-card-header-bg-color;
        opacity: $leaders-card-final-opacity;
      }
      &__body {
        background-color: $leaders-card-body-bg-color;
        opacity: $leaders-card-final-opacity;
      }
    }
  }
}
</style>
