<template>
  <div class="leaders-company-details">
    <a v-if="logoSrc" :href="profileHref" class="leaders-company-details__logo">
      <!-- @todo update this to properly lazyload! -->
      <img
        class="lazyload"
        :src="logoSrc"
        :alt="logoAlt"
      >
    </a>

    <div class="leaders-company-details__links">
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
import ButtonLink from '../../common/button-link.vue';

export default {
  components: { ButtonLink },

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

  computed: {
    logoAlt() {
      return `${this.companyName} Logo`;
    },
  },
};
</script>

<style lang="scss">
@import "../../../scss/variables";

.leaders-company-details {
  display: flex;
  flex-direction: column;
  min-width: $leaders-logo-wrapper-size;
  height: 100%;
  &__logo {
    box-sizing: content-box;
    display: block;
    width: $leaders-logo-wrapper-size;
    height: $leaders-logo-wrapper-size;
    margin-bottom: $leaders-card-padding;
    background-color: $leaders-logo-background-color;
    border: $leaders-logo-border-size solid $leaders-logo-background-color;
    border-radius: $leaders-logo-wrapper-size;
    box-shadow: inset 0 0 $leaders-logo-shadow-size $leaders-logo-shadow-color;
    > img {
      width: $leaders-logo-size;
      height: $leaders-logo-size;
      margin-top: $leaders-logo-shadow-size;
      margin-left: $leaders-logo-shadow-size;
      vertical-align: middle;
    }
  }

  &__links {
    margin-top: auto;
  }
}
</style>
