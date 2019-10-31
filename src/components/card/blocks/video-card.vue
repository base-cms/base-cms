<template>
  <div class="leaders-video-card">
    <div v-if="imageSrc" class="leaders-video-card__image">
      <common-link :href="href" target="_blank">
        <img :src="imageSrc">
      </common-link>
    </div>
    <div class="leaders-video-card__title">
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
  },
};
</script>

<style lang="scss">
@import "../../../scss/mixins";
@import "../../../scss/variables";

.leaders-video-card {
  width: $leaders-video-card-image-width;
  font-size: $leaders-video-card-font-size;
  line-height: $leaders-video-card-line-height;

  &__title {
    @include leaders-max-lines(
      $font-size: $leaders-video-card-font-size,
      $line-height: $leaders-video-card-line-height,
      $num: 3,
    );
  }

  &__image {
    img {
      width: $leaders-video-card-image-width;
      height: $leaders-video-card-image-height;
      border: 1px solid $leaders-primary-color-light;
    }
  }
}
</style>
