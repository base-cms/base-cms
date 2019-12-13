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
    href: null,
    params: {},
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
    this.href = provider.href;
    this.params = provider.params;
    this.type = provider.type;
  },
  methods: {
    share() {
      console.log('share!', this.name, this.url);
    },
  },
};
</script>
