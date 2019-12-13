<template>
  <button>
    {{ name }} ({{ provider }})
  </button>
</template>

<script>
import providerList from './providers';

export default {
  props: {
    provider: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    name: null,
    sharer: null,
    type: null,
  }),
  created() {
    const provider = providerList[this.provider];
    this.name = provider.name;
    this.sharer = provider.sharer;
    this.type = provider.type;
  },
};
</script>
