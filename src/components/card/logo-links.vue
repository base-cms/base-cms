<template>
  <div class="leaders-card__logo-links">
    <logo
      v-if="logoSrc"
      :src="logoSrc"
      :company-name="companyName"
    />
  </div>
</template>

<script>
import Logo from './logo.vue';

export default {
  components: { Logo },

  props: {
    companyName: {
      type: String,
      required: true,
    },
    profileHref: {
      type: String,
      required: true,
    },
    companyHref: {
      type: String,
      default: null,
    },
    logoSrc: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.leaders-card {
  &__logo-links {
    padding-right: $leaders-card-padding;
  }
}
</style>
