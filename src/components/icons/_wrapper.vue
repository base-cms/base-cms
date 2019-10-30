<template>
  <tag
    :is="tag"
    v-if="name"
    :class="classNames"
  >
    <slot />
  </tag>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    className: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: 'span',
    },
  },
  computed: {
    classNames() {
      return ['leaders-icon', `leaders-icon--${this.name}`, this.className];
    },
  },
};
</script>
