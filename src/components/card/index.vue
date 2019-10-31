<template>
  <div :class="classNames">
    <div class="leaders-card__header">
      <div class="leaders-card__company-details">
        <logo
          v-if="logo.src"
          :src="logo.src"
          :alt="logo.alt"
        />
      </div>
      <company-summary
        :headline="company.productSummary"
        :teaser="company.teaser"
      />
    </div>
    <div class="leaders-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
import { getAsObject } from '@base-cms/object-path';
import Logo from './logo.vue';
import CompanySummary from './company-summary.vue';

export default {
  components: {
    CompanySummary,
    Logo,
  },

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

  &__company-details + &__company-summary {
    border-left: 1px solid $leaders-card-header-hr-color;
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
