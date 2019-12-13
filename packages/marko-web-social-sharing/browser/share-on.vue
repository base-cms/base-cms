<template>
  <button>
    {{ name }} ({{ provider }})
  </button>
</template>

<script>
import networks from './networks';

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
    const network = networks[this.provider];
    this.name = network.name;
    this.sharer = network.sharer;
    this.type = network.type;
  },
};
</script>
