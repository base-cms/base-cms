<template>
  <div class="leaders-section" :data-section-id="sectionId">
    <div v-if="children.length" class="leaders-section__children">
      <div class="leaders-section__title">
        {{ title }}
      </div>
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

  computed: {
    hasChildren() {
      return Boolean(this.children.length);
    },
  },

  methods: {
    emitCardAction(...args) {
      console.log('emitCardAction', ...args);
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.leaders-section {
  margin-bottom: 15px;

  &__title {
    width: 100%;
    margin-bottom: 8px;
    font-size: 17px;
    font-weight: 600;
    color: #919191;
    text-transform: uppercase;
    border-bottom: 1px solid #919191;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
