<template>
  <div v-bind:class="wrappingClassObj" v-bind:style="{ display: display }" v-if="error">
    <pre>An unexpected error occurred: {{ error.message }}</pre>
    <pre>{{ error.stack }}</pre>
  </div>
  <div v-bind:class="wrappingClassObj" v-bind:style="{ display: display }" v-else>
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
import $ from '../jquery';

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
    appendTo: {
      type: String,
      required: true,
    },
  },
  data: () => ({ loading: false, display: 'block', error: null }),
  methods: {
    async load() {
      this.error = null;
      this.loading = true;
      const q = encodeURIComponent(JSON.stringify(this.params));
      const href = `/load-more/${this.blockName}?q=${q}`
      try {
        const r = await fetch(href);
        const html = await r.text();
        const temp = document.createElement('div');
        if (this.appendTo) {
          const parent = document.querySelector(this.appendTo);
          if (parent) {
            parent.appendChild(temp);
            $(temp).replaceWith(html);
          }
        }
        this.display = 'none';
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
