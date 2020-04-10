<template>
  <div class="radix-identity-detector" :data-app-id="appId" />
</template>

<script>
import sendRequest from './send-request';

export default {
  inject: ['EventBus'],

  props: {
    appId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    identityKey: 'ident[pull]',
  }),

  created() {
    this.track();
  },

  methods: {
    async track() {
      const ident = this.parseIdentityValue();
      if (ident) {
        const res = await sendRequest({
          appId: this.appId,
          method: 'GET',
          endpoint: `/app/auth?${this.encode(this.identityKey)}=${this.encode(ident)}`,
        });
        const json = await res.json();
        const { identity } = json || {};
        this.EventBus.$emit('radix-identity-detected', identity);
        if (window.Sapience && identity) {
          window.Sapience.Tracker.setIdentity(identity);
        }
      }
    },
    parseIdentityValue() {
      const search = window.location.search.replace(/(^\?)/, '');
      const pairs = search.split('&');

      let ident;
      for (let i = 0; i < pairs.length; i += 1) {
        const pair = pairs[i];
        const [key, value] = pair.split('=').map(v => this.decode(v));
        if (key === `rdx.${this.identityKey}` && value) {
          ident = value;
        }
      }
      return ident;
    },
    decode(value) {
      return decodeURIComponent(value);
    },
    encode(value) {
      return encodeURIComponent(value);
    },
  },
};
</script>
