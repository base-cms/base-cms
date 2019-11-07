<template>
  <div class="leaders-key-executive">
    <div v-if="imageSrc" class="leaders-key-executive__headshot">
      <img :src="imageSrc" :alt="imageAlt">
    </div>
    <div class="leaders-key-executive__details">
      <span class="leaders-key-executive__name">{{ name }}</span>
      <span v-if="title" class="leaders-key-executive__title">{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    imageSrc: {
      type: String,
      default: null,
    },
  },

  computed: {
    imageAlt() {
      return `${this.name} Headshot`;
    },
  },
};
</script>
