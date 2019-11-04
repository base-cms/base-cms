<template>
  <div
    v-if="children.length"
    class="leaders-section leaders-section--parent"
    :data-section-id="section.id"
  >
    <div class="leaders-section__title">
      {{ section.name }}
    </div>
    <div class="leaders-section__children">
      <leaders-section
        v-for="child in children"
        :key="child.id"
        :section-id="child.id"
        :title="child.name"
        :open="open"
        @card-action="emitCardAction"
      />
    </div>
  </div>
  <leaders-section
    v-else
    :section-id="section.id"
    :title="section.name"
    :open="open"
    @card-action="emitCardAction"
  />
</template>

<script>
import LeadersSection from './section.vue';
import getEdgeNodes from '../../utils/get-edge-nodes';

export default {
  components: {
    LeadersSection,
  },

  props: {
    section: {
      type: Object,
      required: true,
    },
    open: {
      type: String,
      required: true,
    },
  },

  computed: {
    children() {
      return getEdgeNodes(this.section, 'children');
    },
  },

  methods: {
    emitCardAction(...args) {
      this.$emit('card-action', ...args);
    },
  },
};
</script>
