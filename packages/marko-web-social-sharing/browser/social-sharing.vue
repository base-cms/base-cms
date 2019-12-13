<template>
  <div class="social-sharing">
    <share-on
      v-for="provider in filteredProviders"
      :key="provider"
      :provider="provider"
    />
  </div>
</template>

<script>
import providerList from './providers';
import ShareOn from './share-on.vue';

export default {
  components: { ShareOn },

  props: {
    url: {
      type: String,
      required: true,
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
