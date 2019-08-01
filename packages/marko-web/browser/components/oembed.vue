<!-- eslint-disable vue/no-v-html-->
<template>
  <span
    :id="id"
    class="lazyload"
    :data-embed-type="attrs.type"
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
    endpoint: {
      type: String,
      default: '/__oembed',
    },
  },
  data: () => ({ loading: false, error: null, embed: null }),
  computed: {
    id() {
      return `${this.attrs.id}-${Date.now()}`;
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
  },
  methods: {
    lazyload({ target }) {
      if (target.id === this.id) this.load();
    },
    async load() {
      this.loading = true;
      const href = `${this.endpoint}?url=${encodeURIComponent(this.url)}`;
      try {
        const r = await fetch(href);
        const { html } = await r.json();
        this.embed = html;
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
