<!-- eslint-disable vue/no-v-html-->
<template>
  <span
    v-if="oembedType === 'link'"
    :id="id"
    class="lazyload"
    :data-embed-type="attrs.type"
    :data-oembed-type="oembedType"
    :data-oembed-provider="provider"
    :data-expand="expand"
  >
    <iframe
      :src="oembedUrl"
      width="100%"
      height="100%"
      frameborder="0"
    />
  </span>
  <span
    v-else
    :id="id"
    class="lazyload"
    :data-embed-type="attrs.type"
    :data-oembed-type="oembedType"
    :data-oembed-provider="provider"
    :data-expand="expand"
    v-html="html"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    expand: {
      type: Number,
      default: 250,
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
    mountPoint: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    error: null,
    embed: null,
    oembedType: null,
    oembedUrl: null,
    provider: null,
    observer: null,
  }),
  computed: {
    id() {
      const clean = `${this.attrs.id}`.replace(/[\W|-]/ig, '');
      return `${clean}-${Date.now()}`;
    },
    html() {
      if (this.embed) return this.embed;
      if (this.error) return `<pre>An unexpected error occurred: ${this.error.message}</pre>`;
      if (this.loading) return `Loading embed from ${this.url}`;
      return '';
    },
  },
  mounted() {
    document.addEventListener('lazybeforeunveil', this.lazyload.bind(this));
    if (window.MutationObserver) {
      // inline script tags aren't added to the DOM, so the twitter widget never loads
      // This would be widespread -- if the payload returns a script tag, ensure that it is
      // appended to the head rather than written as part of the `embed` code here.
      this.observer = new MutationObserver((mutationList) => {
        for (let i = 0; i < mutationList.length; i += 1) {
          const mutation = mutationList[i];
          if (mutation.type === 'childList') {
            for (let x = 0; x < mutation.addedNodes.length; x += 1) {
              const added = mutation.addedNodes[x];
              if (added.tagName && added.tagName === 'SCRIPT') {
                const script = document.createElement('script');
                for (let n = 0; n < added.attributes.length; n += 1) {
                  const { name, value } = added.attributes[n];
                  script.setAttribute(name, value);
                }
                document.querySelector('head').appendChild(script);
              }
            }
          }
        }
      });
      const node = document.getElementById(this.id);
      this.observer.observe(node, { childList: true, subtree: true });
    }
  },
  beforeDestroy() {
    document.removeEventListener('lazybeforeunveil', this.lazyload);
    if (this.observer) this.observer.disconnect();
  },
  methods: {
    lazyload({ target }) {
      if (target.id === this.id) this.load();
    },
    async load() {
      this.loading = true;
      const href = `${this.mountPoint}?url=${encodeURIComponent(this.url)}`;
      try {
        const r = await fetch(href, { credentials: 'same-origin' });
        const {
          html,
          type,
          provider_name: provider,
          url,
        } = await r.json();
        this.oembedType = type;
        this.provider = provider;
        this.embed = html;
        this.oembedUrl = url;
      } catch (e) {
        // @todo Log this!
        this.error = e;
      } finally {
        this.loading = false;
        document.removeEventListener('lazybeforeunveil', this.lazyload);
      }
    },
  },
};
</script>
