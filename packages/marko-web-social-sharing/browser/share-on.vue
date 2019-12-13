<template>
  <button :class="classNames" @click="share">
    {{ name }}
  </button>
</template>

<script>
import providerList from './providers';

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    name: null,
    sharer: null,
    type: null,
  }),
  computed: {
    classNames() {
      const elementName = 'social-sharing__button';
      return [elementName, `${elementName}--${this.provider}`];
    },
  },
  created() {
    const provider = providerList[this.provider];
    this.name = provider.name;
    this.sharer = provider.sharer;
    this.type = provider.type;
  },
  methods: {
    share() {
      console.log('share!', this.url);
    },
  },
};
</script>
