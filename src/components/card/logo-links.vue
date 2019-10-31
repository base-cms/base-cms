<template>
  <div class="leaders-card__logo-links">
    <logo
      v-if="logoSrc"
      :src="logoSrc"
      :href="profileHref"
      :company-name="companyName"
    />
    <div class="leaders-card__links">
      <button-link
        v-if="companyHref"
        :href="companyHref"
        :block="true"
        target="_blank"
        type="accent"
      >
        Visit Site
      </button-link>
      <button-link :href="profileHref" :block="true">
        Visit Profile
      </button-link>
    </div>
  </div>
</template>

<script>
import Logo from './logo.vue';
import ButtonLink from './button-link.vue';

export default {
  components: { Logo, ButtonLink },

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
    min-width:
      calc(
        #{$leaders-logo-wrapper-size} + #{$leaders-logo-border-size * 2} + #{$leaders-card-padding}
      );
    padding-right: $leaders-card-padding;
  }
}
</style>
