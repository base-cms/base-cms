<template>
  <aside class="leaders">
    <navbar>
      <nav-container ref="nav" :direction="navDirection">
        <nav-item
          v-for="(item, index) in items"
          :key="index"
        >
          <nav-link
            tag="button"
            :index="index"
            :active-index="activeIndex"
            @focusin="onLinkFocus"
            @pointer-enter="onLinkEnter"
            @pointer-end="onLinkEnd"
            @pointer-leave="onLinkLeave"
          >
            <span>{{ item.label }}</span>
          </nav-link>
        </nav-item>
      </nav-container>
    </navbar>
    <mounting-portal mount-to="#leaders-dropdown-portal-target" name="leaders-dropdown" append>
      <dropdown
        :direction="navDirection"
        :open="open"
        :transitions-disabled="transitionsDisabled"
        :is-active="isDropdownActive"
      >
        <dropdown-background
          :styles="styles.background"
          :inner-styles="styles.innerBackground"
        />
        <dropdown-arrow :styles="styles.arrow" />
        <dropdown-container
          :styles="styles.container"
          @pointer-enter="onContainerEnter"
          @pointer-end="onContainerEnd"
          @pointer-leave="onContainerLeave"
        >
          <dropdown-section
            v-for="(item, index) in items"
            ref="sections"
            :key="index"
            :index="index"
            :active-index="activeIndex"
            :last-active-index="lastActiveIndex"
          >
            <slot :item="item" />
          </dropdown-section>
        </dropdown-container>
      </dropdown>
    </mounting-portal>
  </aside>
</template>

<script>
import { MountingPortal } from 'portal-vue';
import ElementCalculus from './leaders/element-calculus';
import ArrowPosition from './leaders/positions/arrow-position';
import MenuPosition from './leaders/positions/menu-position';
import Dropdown from './leaders/dropdown.vue';
import DropdownArrow from './leaders/dropdown/arrow.vue';
import DropdownBackground from './leaders/dropdown/background.vue';
import DropdownContainer from './leaders/dropdown/container.vue';
import DropdownSection from './leaders/dropdown/section.vue';
import Navbar from './leaders/navbar.vue';
import NavContainer from './leaders/nav/container.vue';
import NavItem from './leaders/nav/item.vue';
import NavLink from './leaders/nav/link.vue';
import pointerEvents from './leaders/pointer-events';

const pointerEvent = pointerEvents();

export default {
  components: {
    Dropdown,
    DropdownArrow,
    DropdownBackground,
    DropdownContainer,
    DropdownSection,
    MountingPortal,
    Navbar,
    NavContainer,
    NavItem,
    NavLink,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
    navDirection: {
      type: String,
      default: null,
    },
    open: {
      type: String,
      default: 'below',
      validator: v => ['above', 'below', 'left', 'right'].includes(v),
    },
    dropdownWidth: {
      type: Number,
      default: 380,
      validator: v => v > 0,
    },
    dropdownHeight: {
      type: Number,
      default: 400,
      validator: v => v > 0,
    },
    screenOffset: {
      type: Number,
      default: 0, // this is not properly handled yet. do not use.
      validator: v => v >= 0,
    },
  },

  data: () => ({
    activeIndex: null,
    lastActiveIndex: null,
    isDragging: false,
    isDropdownActive: false,
    transitionsDisabled: true,

    closeTimeout: null,
    enableTransitionTimeout: null,
    disableTransitionTimeout: null,

    styles: {
      arrow: {},
      container: {},
      background: {},
      innerBackground: {},
    },
  }),

  computed: {
    activeSection() {
      const { activeIndex } = this;
      if (activeIndex == null) return null;
      return this.sections[activeIndex];
    },

    sections() {
      return this.$refs.sections || [];
    },
    isMenuClosed() {
      return this.activeIndex == null;
    },
  },

  mounted() {
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchstart', this.onTouchStart);
    document.body.addEventListener(pointerEvent.end, this.onPointerEnd);
  },

  beforeDestroy() {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchstart', this.onTouchStart);
    document.body.removeEventListener(pointerEvent.end, this.onPointerEnd);
  },

  methods: {
    onLinkFocus({ index, element }) {
      this.clearCloseTimeout();
      this.openDropdownFor({ link: element, activeIndex: index });
    },

    onLinkEnter({ index, element, event }) {
      if (event.pointerType !== 'touch') {
        this.clearCloseTimeout();
        this.openDropdownFor({ link: element, activeIndex: index });
      }
    },

    onLinkEnd({ index, element, event }) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleDropdownFor({ link: element, activeIndex: index });
    },

    onLinkLeave({ event }) {
      if (event.pointerType !== 'touch') {
        this.setCloseTimeout();
      }
    },

    onContainerEnter({ event }) {
      if (event.pointerType !== 'touch') this.clearCloseTimeout();
    },

    onContainerEnd({ event }) {
      event.stopPropagation();
    },

    onContainerLeave({ event }) {
      if (event.pointerType !== 'touch') this.setCloseTimeout();
    },

    toggleDropdownFor({ link, activeIndex }) {
      if (this.activeIndex === activeIndex) {
        this.closeDropdown();
      } else {
        this.openDropdownFor({ link, activeIndex });
      }
    },

    openDropdownFor({ link, activeIndex }) {
      if (this.activeIndex === activeIndex) return;

      // Set active dropdown id.
      this.activeIndex = activeIndex;
      this.isDropdownActive = true;
      // Set last active index
      this.lastActiveIndex = activeIndex;

      const { activeSection } = this;
      if (!activeSection) throw new Error(`No dropdown section was found for index ${activeIndex}`);
      const content = activeSection.content.$el;
      const linkRect = link.getBoundingClientRect();
      const navRect = this.$refs.nav.$el.getBoundingClientRect();

      /**
       * @todo The menu elements should _pre_ position themselves _before_ the
       * element calculations are made. This will simplifiy the overall positions
       * and required translations (relative to viewport requirements)
       */
      const { open, screenOffset } = this;
      // Create element calculus info.
      const calcs = new ElementCalculus({ content, linkRect, navRect });
      // Calculate dropdown menu position.
      const menu = new MenuPosition({ openDirection: open, calculus: calcs, screenOffset });
      // Calculate arrow position.
      const arrow = new ArrowPosition({ openDirection: open, calculus: calcs });

      this.clearDisableTransitionTimeout();
      this.setEnableTransitionTimeout();

      // This works for horizontal and vertical downward open
      const menuStyles = {
        transform: `translate(${menu.xPx}, ${menu.yPx})`,
        width: calcs.menu('w', { px: true }),
        height: calcs.menu('h', { px: true }),
      };
      this.styles.container = menuStyles;
      this.styles.background = menuStyles;
      this.styles.arrow = { transform: `translate(${arrow.xPx}, ${arrow.yPx}) rotate(45deg)` };

      const { children } = content;
      if (children) this.styles.innerBackground = { transform: `translate(${children[0].offsetWidth}px, ${children[0].offsetHeight}px)` };
    },

    closeDropdown() {
      if (this.activeIndex == null) return;

      this.clearEnableTransitionTimeout();
      this.setDisableTransitionTimeout();

      this.isDropdownActive = false;

      // Unset active dropdown (but leave the last active)
      this.activeIndex = null;
    },

    setCloseTimeout() {
      this.closeTimeout = setTimeout(() => this.closeDropdown(), 50);
    },

    clearCloseTimeout() {
      clearTimeout(this.closeTimeout);
    },

    setEnableTransitionTimeout() {
      this.enableTransitionTimeout = setTimeout(() => {
        this.transitionsDisabled = false;
      }, 50);
    },

    clearEnableTransitionTimeout() {
      clearTimeout(this.enableTransitionTimeout);
    },

    setDisableTransitionTimeout() {
      this.disableTransitionTimeout = setTimeout(() => {
        this.transitionsDisabled = true;
      }, 50);
    },

    clearDisableTransitionTimeout() {
      clearTimeout(this.disableTransitionTimeout);
    },

    onPointerEnd() {
      if (!this.isDragging) this.closeDropdown();
    },

    onTouchMove() {
      this.isDragging = true;
    },

    onTouchStart() {
      this.isDragging = false;
    },
  },
};
/* eslint-disable */
</script>

<style lang="scss">
.leaders {
  width: 100%;
  &__dropdown-portal {
    z-index: 10;
    perspective: 1500px;
  }
}
</style>
