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
      :show-action="showAction"
      @open="emitEvent('open', ...arguments)"
      @change="emitEvent('change', ...arguments)"
      @close="emitEvent('close', ...arguments)"
    />
  </div>
</template>

<script>
import providerList from './providers';
import ShareButton from './share-button.vue';

export default {
  inject: ['EventBus'],

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
    showAction: {
      type: Boolean,
      default: false,
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

  methods: {
    emitEvent(name, provider) {
      const { url, title } = this;
      console.log(`social-share-${name}`, { url, title, provider });
      this.EventBus.$emit(`social-share-${name}`, { url, title, provider });
    },
  },
};
</script>
