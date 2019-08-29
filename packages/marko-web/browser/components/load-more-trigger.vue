<template>
  <div
    :id="elementId"
    :class="classes"
    :style="{ display: display }"
    :data-expand="expand"
  >
    <div v-if="error">
      <pre>An unexpected error occurred: {{ error.message }}</pre>
      <pre>{{ error.stack }}</pre>
    </div>
    <button
      v-else
      :class="buttonClass"
      :disabled="loading"
      @click="load()"
    >
      <template v-if="loading">
        Loading...
      </template>
      <template v-else>
        {{ buttonLabel }}
      </template>
    </button>
  </div>
</template>

<script>
import $ from '../jquery';
import elementId from './element-id';

export default {
  props: {
    mountPoint: {
      type: String,
      required: true,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
    provide: {
      type: Object,
      default: () => ({}),
    },
    appendTo: {
      type: String,
      required: true,
    },
    maxPages: {
      type: Number,
      default: null,
    },
    className: {
      type: String,
      default: null,
    },
    buttonClass: {
      type: String,
      default: null,
    },
    buttonLabel: {
      type: String,
      default: 'Load More Content',
    },
    expand: {
      type: Number,
      default: 250,
    },
  },
  data: () => ({ loading: false, hasLoaded: false, error: null }),
  computed: {
    classes() {
      const classes = ['load-more-trigger', 'lazyload'];
      if (this.className) classes.push(this.className);
      return classes;
    },
    elementId() {
      return elementId('load-more');
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
      if (target.id === this.elementId) this.load();
    },
    async load() {
      const input = {
        ...this.provide,
        pageNumber: this.pageNumber + 1,
      };
      this.error = null;
      this.loading = true;
      const href = `${this.mountPoint}/?input=${encodeURIComponent(JSON.stringify(input))}`;
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
        document.removeEventListener('lazybeforeunveil', this.lazyload.bind(this));
      }
    },
  },
};
</script>
