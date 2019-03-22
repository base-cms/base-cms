<template>
  <div>
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
  data: () => ({ loading: false }),
  methods: {
    load() {
      this.loading = true;
      const href = `/load-more/${this.tag}?q=${encodeURIComponent(JSON.stringify(this.params))}`
      fetch(href).then(r => r.text()).then(html => {
        setInnerHTML(this.$el, html);
      }).finally(() => {
        this.loading = false;
      });
    },
  },
}
</script>
