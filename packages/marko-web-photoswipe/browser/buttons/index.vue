<template>
  <component :is="type" />
</template>

<script>
import Close from './close.vue';
import Fullscreen from './fullscreen.vue';
import Next from './next.vue';
import Previous from './previous.vue';
import Share from './share.vue';
import Zoom from './zoom.vue';

export default {
  components: {
    Close,
    Fullscreen,
    Next,
    Previous,
    Share,
    Zoom,
  },

  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
