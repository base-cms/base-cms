<template>
  <div v-if="error" :class="wrappingClassObj" :style="{ display: display }">
    <pre>An unexpected error occurred: {{ error.message }}</pre>
    <pre>{{ error.stack }}</pre>
  </div>
  <div v-else :class="wrappingClassObj" :style="{ display: display }">
    <button
      :id="buttonId"
      :class="buttonClass"
      :disabled="loading"
      @click="load()"
    >
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
    pageNumber: {
      type: Number,
      required: true,
    },
    provide: {
      type: Object,
      default: () => ({}),
    },
    buttonClassObj: {
      type: Object,
      default: () => ({}),
    },
    wrappingClassObj: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: String,
      default: 'Load More',
    },
    appendTo: {
      type: String,
      required: true,
    },
    maxPages: {
      type: Number,
      default: 3,
    },
  },
  data: () => ({ loading: false, hasLoaded: false, error: null }),
  computed: {
    buttonClass() {
      return { ...this.buttonClassObj, lazyload: true };
    },
    buttonId() {
      return `load-more-${Date.now()}`;
    },
    display() {
      if (this.hasLoaded) return 'none';
      return 'block';
    },
    canLazyload() {
      if (this.maxPages === 0) return false;
      const max = parseInt(this.maxPages, 10);
      if (!max) return true;
      return this.pageNumber <= max;
    },
  },
  created() {
    if (this.canLazyload) document.addEventListener('lazybeforeunveil', this.lazyload.bind(this));
  },
  methods: {
    lazyload({ target }) {
      if (target.id === this.buttonId) this.load();
    },
    async load() {
      const input = {
        ...this.provide,
        pageNumber: this.pageNumber + 1,
      };
      this.error = null;
      this.loading = true;
      const href = `/load-more/${this.blockName}?input=${encodeURIComponent(JSON.stringify(input))}`;
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
      } catch (e) {
        // @todo Log this!
        this.error = e;
      } finally {
        this.loading = false;
        this.hasLoaded = true;
        document.removeEventListener('lazybeforeunveil', this.lazyload);
      }
    },
  },
};
</script>
