<template>
  <div :class="classNames">
    <card-header>
      <slot name="header" />
    </card-header>
    <card-body>
      <slot name="body" />
    </card-body>
  </div>
</template>

<script>
import CardBody from './body.vue';
import CardHeader from './header.vue';

export default {
  components: { CardBody, CardHeader },

  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
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
    padding: $leaders-card-header-padding;
    color: $leaders-card-header-color;
    background-color: rgba(255, 255, 255, 0);
    opacity: 0;
    transition-duration: .75s;
    transition-property: background-color, opacity;
  }

  &__body {
    flex: 1 1 auto;
    padding: $leaders-card-body-padding;
    color: $leaders-card-body-color;
    background-color: rgba(255, 255, 255, 0);
    opacity: 0;
    transition-duration: .75s;
    transition-property: background-color, opacity;
  }

  &__company-info {
    // @todo change to max-width
    // there is a bug where when card resizes it doesn't change
    width: 380px;
    > *:not(:last-child) {
      margin-bottom: 14px;
    }
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
        opacity: 1;
      }
      &__body {
        background-color: $leaders-card-body-bg-color;
        opacity: 1;
      }
    }
  }
}
</style>
