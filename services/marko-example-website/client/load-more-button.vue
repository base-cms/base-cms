<template>
  <div v-bind:class="wrappingClassObj" v-if="error">
    <pre>An unexpected error occurred: {{ error.message }}</pre>
    <pre>{{ error.stack }}</pre>
  </div>
  <div v-bind:class="wrappingClassObj" v-else>
    <button v-on:click="load()" v-bind:disabled="loading" v-bind:class="buttonClassObj">
      <template v-if="loading">
        Loading...
      </template>
      <template v-else>
        {{ label }}
      </template>
    </button>
  </div>
</template>

<script>
import setInnerHTML from './utils/set-inner-html';

export default {
  props: {
    blockName: {
      type: String,
      required: true,
    },
    params: Object,
    buttonClassObj: Object,
    wrappingClassObj: Object,
    label: {
      type: String,
      default: 'Load More',
    },
  },
  data: () => ({ loading: false, error: null }),
  methods: {
    async load() {
      this.error = null;
      this.loading = true;
      const href = `/load-more/${this.blockName}?q=${encodeURIComponent(JSON.stringify(this.params))}`
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
