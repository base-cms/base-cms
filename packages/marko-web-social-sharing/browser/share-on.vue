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
    encode(v) {
      return encodeURIComponent(v);
    },
    buildSharerUrl() {
      const pattern = /^@/;
      const kvs = Object.keys(this.params).map((key) => {
        const value = this.params[key];
        if (pattern.test(value)) {
          // Needs to be replaced with a component value.
          const prop = value.replace(pattern, '');
          return { key, value: this[prop] };
        }
        // Return value as is
        return { key, value };
      }).filter(({ value }) => value).map(({ key, value }) => `${this.encode(key)}=${this.encode(value)}`);
      return `${this.href}?${kvs.join('&')}`;
    },
    share() {
      const url = this.buildSharerUrl();
      console.log('share!', this.name, url);
    },
  },
};
</script>
