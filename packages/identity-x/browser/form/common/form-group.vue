<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    classNames() {
      const classNames = ['form-group'];
      const { className } = this;
      if (className) classNames.push(className);
      return classNames;
    },
  },
};
</script>
