<template>
  <div class="leaders-promotion-card" :data-content-id="contentId">
    <div v-if="src" class="leaders-promotion-card__image">
      <common-link :href="href" target="_blank" @click="emitClick('Card Image', ...arguments)">
        <img :src="src" :alt="imageAlt">
      </common-link>
    </div>
    <div class="leaders-promotion-card__title">
      <common-link :href="href" target="_blank" @click="emitClick('Card Title', ...arguments)">
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
    contentId: {
      type: Number,
      required: true,
    },
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
    imageIsLogo: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    src() {
      if (this.imageIsLogo) {
        return `${this.imageSrc}&fit=fill&fill-color=fff&pad=5`;
      }
      return this.imageSrc;
    },
  },

  methods: {
    emitClick(sourceLabel, data, event) {
      this.$emit('click', {
        sourceLabel,
        contentId: this.contentId,
        title: this.title,
        ...data,
      }, event);
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
