<template>
  <gcse:search v-pre />
</template>

<script>
export default {
  props: {
    apiKey: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = `https://www.google.com/cse/cse.js?cx=${this.apiKey}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  },
};
</script>
