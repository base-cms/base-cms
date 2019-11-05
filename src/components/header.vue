<template>
  <div v-if="display" class="leaders__header">
    <div v-if="imgSrc" class="leaders__header-image">
      <img :src="imgSrc" :alt="imgAlt">
    </div>
    <div v-if="displayCallout" class="leaders__header-callout">
      <div class="leaders__callout-prefix">
        {{ calloutPrefix }}
      </div>
      <div class="leaders__callout-value">
        {{ calloutValue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    display: {
      type: Boolean,
      default: true,
    },
    imgSrc: {
      type: String,
      default: null,
    },
    imgAlt: {
      type: String,
      default: null,
    },
    displayCallout: {
      type: Boolean,
      default: true,
    },
    calloutPrefix: {
      type: String,
      default: 'Browse these',
    },
    calloutValue: {
      type: String,
      default: 'leading suppliers',
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

.leaders {
  &__header {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: $leaders-header-padding;
    font-weight: $leaders-header-font-weight;
    line-height: $leaders-header-line-height;
    color: $leaders-header-color;
    background-color: $leaders-header-bg-color;
  }

  &__header-image {
    margin-top: auto;
    margin-bottom: auto;
    > img {
      max-width: 300px;
    }
  }

  &__header-callout {
    padding-right: $leaders-header-padding;
    padding-left: $leaders-header-padding;
    margin: auto;
    font-size: $leaders-header-callout-font-size;
    text-transform: $leaders-header-callout-text-transform;
  }

  &__callout-value {
    font-weight: $leaders-header-callout-value-font-weight;
  }
}
</style>
