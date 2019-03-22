<template>
  <div v-if="error">
    <pre>An unexpected error occurred: {{ error.message }}</pre>
    <pre>{{ error.stack }}</pre>
  </div>
  <div v-else>
    <button v-on:click="load()" v-bind:disabled="loading">
      <template v-if="loading">
        Loading...
      </template>
      <template v-else>
        Load More
      </template>
    </button>
  </div>
</template>

<script>
import setInnerHTML from './utils/set-inner-html';

export default {
  props: ['tag', 'params'],
  data: () => ({ loading: false, error: null }),
  methods: {
    async load() {
      this.error = null;
      this.loading = true;
      const href = `/load-more/${this.tag}?q=${encodeURIComponent(JSON.stringify(this.params))}`
      try {
        const r = await fetch(href);
        const html = await r.text();
        setInnerHTML(this.$el, html);
      } catch (e) {
        // @todo Log this!
        this.error = e;
      } finally {
        this.loading = false;
      }
    }
  },
}
</script>
