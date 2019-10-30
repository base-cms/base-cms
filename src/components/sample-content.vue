<template>
  <div class="content">
    <h3 style="margin: 0; margin-bottom: 1rem;">
      {{ label }}
    </h3>
    <p style="margin: 0;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed ligula diam, molestie non facilisis eget, mollis eget nisi.
      Nam tempus nulla et lorem commodo, quis tincidunt velit bibendum.
      Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Donec ultricies volutpat luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Suspendisse vel erat augue. Nullam mattis dui in nunc lobortis, eu pellentesque lacus ornare.
      Integer ut quam eget orci varius placerat euismod eget eros.
      Proin ac orci sit amet tortor congue interdum a quis purus.
      Vivamus et eros suscipit lacus sodales molestie.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.content {
  max-width: 350px;
  padding: 20px;
}
</style>
