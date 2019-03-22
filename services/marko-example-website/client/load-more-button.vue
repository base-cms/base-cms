<template>
  <div v-if="html">

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
const setInnerHTML = (ele, html) => {
  ele.innerHTML = html;
  Array.from(ele.querySelectorAll('script')).forEach((oldScript) => {
    const newScript = document.createElement('script');
    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
};

export default {
  props: ['tag', 'params'],
  data: () => ({ loading: false, html: null }),
  methods: {
    load() {
      this.loading = true;
      const href = `/load-more/${this.tag}?q=${encodeURIComponent(JSON.stringify(this.params))}`
      fetch(href).then(r => r.text()).then(html => {
        this.html = html;
        setInnerHTML(this.$el, html);
      }).finally(() => {
        this.loading = false;
      });
    },
  },
}
</script>
