<template>
  <div class="leaders-promotion-card">
    <div v-if="imageSrc" class="leaders-promotion-card__image">
      <common-link :href="href" target="_blank">
        <img :src="imageSrc" :alt="imageAlt">
      </common-link>
    </div>
    <div v-if="imageSrc" class="leaders-promotion-card__title">
      <common-link :href="href" target="_blank">
        {{ title }}
      </common-link>
    </div>
  </div>
</template>

<script>
import CommonLink from '../../common/link.vue';

export default {
  components: { CommonLink },

  props: {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      default: null,
    },
    imageAlt: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import "../../../scss/mixins";
@import "../../../scss/variables";

.leaders-promotion-card {
  width: $leaders-promotion-card-image-width;
  font-size: $leaders-promotion-card-font-size;
  line-height: $leaders-promotion-card-line-height;

  &__title {
    @include leaders-max-lines(
      $font-size: $leaders-promotion-card-font-size,
      $line-height: $leaders-promotion-card-line-height,
      $num: 3,
    );
  }

  &__image {
    img {
      width: $leaders-promotion-card-image-width;
      height: $leaders-promotion-card-image-height;
      border: 1px solid $leaders-primary-color-light;
    }
  }
}
</style>
