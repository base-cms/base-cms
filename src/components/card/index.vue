<template>
  <div :class="classNames">
    <div class="leaders-card__header">
      <logo-links
        :company-name="company.name"
        :logo-src="logo.src"
        :profile-href="profileHref"
        :company-href="company.website"
      />
      <company-summary
        :headline="company.productSummary"
        :teaser="company.teaser"
        :profile-href="profileHref"
      />
    </div>
    <div class="leaders-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
import { get, getAsObject } from '@base-cms/object-path';
import LogoLinks from './logo-links.vue';
import CompanySummary from './company-summary.vue';

export default {
  components: {
    CompanySummary,
    LogoLinks,
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
    profileHref() {
      return get(this.company, 'siteContext.path');
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

  &__logo-links + &__company-summary {
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
