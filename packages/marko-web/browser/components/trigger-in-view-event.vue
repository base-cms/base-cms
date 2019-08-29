<template>
  <div :id="elementId" class="lazyload" :data-expand="expand" />
</template>

<script>
import EventBus from '../event-bus';
import elementId from './element-id';

export default {
  props: {
    eventName: {
      type: String,
      default: 'in-view',
    },
    expand: {
      type: Number,
      default: -100,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    elementId() {
      return elementId(`${this.eventName}-event`);
    },
  },
  created() {
    document.addEventListener('lazybeforeunveil', this.trigger.bind(this));
  },
  methods: {
    trigger(event) {
      const { target } = event;
      if (target.id === this.elementId) {
        EventBus.$emit(this.eventName, { event, data: this.data });
      }
    },
  },
};
</script>
