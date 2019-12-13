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
  },

  data: () => ({
    name: null,
    href: null,
    params: {},
    type: null,
    popup: {
      interval: null,
      features: {
        status: 0,
        resizable: 1,
        toolbar: 0,
        menubar: 0,
        scrollbars: 0,
        location: 0,
        directories: 0,
        width: 626,
        height: 436,
        top: 0,
        left: 0,
      },
    },
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

  mounted() {
    this.setPopupPosition();
  },

  methods: {
    /**
     *
     */
    share() {
      const url = this.buildSharerUrl();
      this.openPopup(url);
      // @todo add support for non-popup types.
    },

    /**
     *
     */
    encode(v) {
      return encodeURIComponent(v);
    },

    /**
     *
     */
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

    /**
     *
     */
    openPopup(url) {
      const provider = providerList[this.provider];
      this.$emit('open', provider);

      let popup = window.open(url, 'social-share', this.buildPopupFeatures());
      if (popup) popup.focus();

      this.popup.interval = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(this.popup.interval);
          popup = undefined;
          this.$emit('close', provider);
        }
      }, 500);
    },

    buildPopupFeatures() {
      const { features } = this.popup;
      return Object.keys(features).map(key => `${key}=${features[key]}`).join(',');
    },

    /**
     *
     */
    setPopupPosition() {
      const { features } = this.popup;
      const { screen } = window;
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

      const { documentElement } = document;
      const innerWidth = documentElement.clientWidth
        ? documentElement.clientWidth : screen.width;
      const innerHeight = documentElement.clientHeight
        ? documentElement.clientHeight : screen.height;

      const width = window.innerWidth ? window.innerWidth : innerWidth;
      const height = window.innerHeight ? window.innerHeight : innerHeight;

      this.popup.features.left = ((width / 2) - (features.width / 2)) + dualScreenLeft;
      this.popup.features.top = ((height / 2) - (features.height / 2)) + dualScreenTop;
    },
  },
};
</script>
