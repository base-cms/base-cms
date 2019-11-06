<template>
  <div class="leaders-video-card" :data-video-id="videoId">
    <div v-if="imageSrc" class="leaders-video-card__image">
      <common-link :href="href" target="_blank" @click="emitClick('Card Image', ...arguments)">
        <img :src="imageSrc">
      </common-link>
    </div>
    <div class="leaders-video-card__title">
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
    videoId: {
      type: String,
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
  },

  methods: {
    emitClick(sourceLabel, data, event) {
      this.$emit('click', {
        sourceLabel,
        videoId: this.videoId,
        title: this.title,
        ...data,
      }, event);
    },
  },
};
</script>
