<template>
  <div :class="blockName" :data-section-id="sectionId">
    <div v-if="children.length">
      <div>{{ title }}</div>
      <section-content-list
        v-for="section in children"
        :key="section.id"
        :section-id="section.id"
        :title="section.name"
        :expanded="expanded"
        @action="emitCardAction"
      />
    </div>
    <section-content-list
      v-else
      :section-id="sectionId"
      :title="title"
      :expanded="expanded"
      @action="emitCardAction"
    />
  </div>
</template>

<script>
import SectionContentList from './section-content-list.vue';

export default {
  components: {
    SectionContentList,
  },

  props: {
    sectionId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    children: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    blockName: 'leaders-section',
    items: [],
  }),

  computed: {
    hasChildren() {
      return Boolean(this.children.length);
    },
  },

  methods: {
    elementClass(name) {
      return `${this.blockName}__${name}`;
    },

    emitCardAction(...args) {
      console.log('emitCardAction', ...args);
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";
</style>
