<template>
  <component
    :is="tag"
    :data-dropdown-id="dropdownId"
    class="leaders__nav-link"
    aria-haspopup="true"
    aria-expanded="false"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    dropdownId: {
      type: [String, Number],
      required: true,
    },
    tag: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="scss">
.leaders {
  &__nav-link {
    display: inline-block;
    height: 50px;
    padding: 0 10px;
    margin: 0;
    font-size: 17px;
    font-weight: 500;
    line-height: 50px;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    background: none;
    border: none;
    outline: none;
    transition: color .1s ease;
    -webkit-tap-highlight-color: transparent;
    > * {
      position: relative;
      display: block;
    }
  }
}
</style>
