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

<style lang="scss">
.leaders-icon {
  display: inline-block;
  width: 1rem;
  height: 1rem;

  svg {
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    vertical-align: middle;
    transition: fill 250ms ease;
    fill: currentColor;
  }

  &--filter-none {
    width: .8rem;
    height: .8rem;
    margin-right: .375rem;
    svg {
      width: .8rem;
      height: .8rem;
    }
  }

  &--videocam {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: .25rem;
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}
</style>
