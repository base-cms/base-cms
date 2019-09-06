<template>
  <button
    :class="className"
    type="button"
    :aria-label="buttonLabel"
    @click="toggle"
  >
    <component :is="icon" :modifiers="iconModifiers" />
  </button>
</template>

<script>
import IconDash from '@base-cms/marko-web-icons/browser/dash.vue';
import IconPlus from '@base-cms/marko-web-icons/browser/plus.vue';
import IconThreeBars from '@base-cms/marko-web-icons/browser/three-bars.vue';
import IconX from '@base-cms/marko-web-icons/browser/x.vue';

const validateIcon = v => ['dash', 'plus', 'three-bars', 'x'].includes(v);

export default {
  components: {
    IconDash,
    IconPlus,
    IconThreeBars,
    IconX,
  },
  props: {
    className: {
      type: String,
      default: null,
    },
    initiallyExpanded: {
      type: Boolean,
      default: false,
    },
    targets: {
      type: Array,
      default: () => [],
    },
    toggleClass: {
      type: String,
      required: true,
    },
    iconModifiers: {
      type: Array,
      default: () => [],
    },
    buttonLabel: {
      type: String,
      default: 'Toggle Menu',
    },
    iconName: {
      type: String,
      default: 'three-bars',
      validator: validateIcon,
    },
    expandedIconName: {
      type: String,
      default: 'x',
      validator: validateIcon,
    },
  },
  data: () => ({
    expanded: false,
  }),
  computed: {
    icon() {
      if (this.expanded) return `icon-${this.expandedIconName}`;
      return `icon-${this.iconName}`;
    },
  },
  created() {
    this.expanded = this.initiallyExpanded;
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
      const elements = document.querySelectorAll(this.targets.join(','));
      Array.prototype.forEach.call(elements, el => el.classList.toggle(this.toggleClass));
    },
  },
};
</script>
