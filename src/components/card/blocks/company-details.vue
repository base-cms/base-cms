<template>
  <div class="leaders-company-details">
    <common-link
      v-if="logoSrc"
      :href="profileHref"
      title="View Company Profile"
      class="leaders-company-details__logo"
      @click="emitProfileClick('Company Logo', ...arguments)"
    >
      <!-- @todo update this to properly lazyload! -->
      <img
        class="lazyload"
        :src="logoSrc"
        :alt="logoAlt"
      >
    </common-link>

    <div class="leaders-company-details__links">
      <button-link
        v-if="companyHref"
        :href="companyHref"
        :block="true"
        target="_blank"
        type="accent"
        @click="emitWebsiteClick"
      >
        Visit Site
      </button-link>
      <button-link
        :href="profileHref"
        :block="true"
        @click="emitProfileClick('View Profile Button', ...arguments)"
      >
        View Profile
      </button-link>
    </div>
  </div>
</template>

<script>
import ButtonLink from '../../common/button-link.vue';
import CommonLink from '../../common/link.vue';

export default {
  components: { ButtonLink, CommonLink },

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

  methods: {
    emitWebsiteClick(...args) {
      this.$emit('website-click', ...args);
    },
    emitProfileClick(sourceLabel, data, event) {
      this.$emit('profile-click', { sourceLabel, ...data }, event);
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

  &__logo + &__links {
    margin-top: auto;
  }
}
</style>
