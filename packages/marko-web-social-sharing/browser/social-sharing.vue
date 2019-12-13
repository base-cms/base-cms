<template>
  <div class="social-sharing">
    <share-button
      v-for="provider in filteredProviders"
      :key="provider"
      :provider="provider"
      :url="url"
      :title="title"
      :description="description"
      :media="media"
    />
  </div>
</template>

<script>
import providerList from './providers';
import ShareButton from './share-button.vue';

export default {
  components: { ShareButton },

  props: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    media: {
      type: String,
      default: null,
    },
    providers: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    filteredProviders() {
      return this.providers.filter(key => providerList[key]);
    },
  },
};
</script>
