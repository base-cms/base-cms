<template>
  <div class="social-sharing">
    <share-on
      v-for="provider in networks"
      :key="provider"
      :provider="provider"
    />
  </div>
</template>

<script>
import networks from './networks';
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
    networks() {
      return this.providers.filter(key => networks[key]);
    },
  },
};
</script>
