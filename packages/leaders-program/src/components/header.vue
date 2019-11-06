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
