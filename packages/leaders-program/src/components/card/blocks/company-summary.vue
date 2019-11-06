<template>
  <div v-if="canDisplay" class="leaders-company-summary">
    <common-link
      v-if="headline"
      :href="profileHref"
      :title="linkTitle"
      class="leaders-company-summary__headline"
      @click="emitProfileClick('Summary Headline', ...arguments)"
    >
      <element-html :value="headline" />
    </common-link>
    <common-link
      v-if="teaser"
      :href="profileHref"
      :title="linkTitle"
      class="leaders-company-summary__teaser"
      @click="emitProfileClick('Summary Teaser', ...arguments)"
    >
      <element-html :value="teaser" />
    </common-link>
  </div>
</template>

<script>
import ElementHtml from '../../common/html.vue';
import CommonLink from '../../common/link.vue';

export default {
  components: { ElementHtml, CommonLink },

  props: {
    headline: {
      type: String,
      default: null,
    },
    teaser: {
      type: String,
      default: null,
    },
    profileHref: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    linkTitle: 'View Company Profile',
  }),

  computed: {
    canDisplay() {
      return Boolean(this.headline || this.teaser);
    },
  },

  methods: {
    emitProfileClick(sourceLabel, data, event) {
      this.$emit('profile-click', { sourceLabel, ...data }, event);
    },
  },
};
</script>
