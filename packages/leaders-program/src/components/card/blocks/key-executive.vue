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

<style lang="scss">
@import "../../../scss/variables";

.leaders-key-executive {
  display: flex;
  flex-direction: row;

  &__headshot {
    padding-right: $leaders-card-padding;

    > img {
      width: 50px;
      height: 50px;
      border: 1px solid #d4d4d4;
      border-radius: 50px;
    }
  }

  &__details {
    font-size: $leaders-key-executive-font-size;
    font-weight: $leaders-key-executive-font-weight;
  }

  &__title {
    &::before {
      content: ", ";
    }
  }
}

</style>
