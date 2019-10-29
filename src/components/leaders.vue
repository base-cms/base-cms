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
  </aside>
</template>

<script>
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
      default: 10,
      validator: v => v > 0,
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
      const contentOffsetW = content.offsetWidth;
      const contentOffsetH = content.offsetHeight;

      // @todo Handle when content is near viewport edges.
      // const { offsetWidth: bodyOffsetWidth } = document.body;
      // const allowedWidth = bodyOffsetWidth - (this.screenOffset * 2);

      // Crop the width of the content if it goes beyond the width of the screen
      // if (contentOffsetW > allowedWidth - (this.screenOffset * 2)) {
      //   contentOffsetW = bodyOffsetWidth - (this.screenOffset * 2);
      // }

      const ratioWidth = contentOffsetW / this.dropdownWidth;
      const ratioHeight = contentOffsetH / this.dropdownHeight;
      const linkRect = link.getBoundingClientRect();
      const navRect = this.$refs.nav.$el.getBoundingClientRect();

      // @todo determine how to handle if x position is outside of viewport.
      // const max = Math.max(linkRect.left + linkRect.width / 2 - contentOffsetW / 2, 10);
      // let pos = Math.round(max);

      const { open, screenOffset } = this;

      // Calculate dropdown position.
      const dropdownPos = {};
      if (open === 'left' || open === 'right') {
        dropdownPos.y = (linkRect.top - navRect.top) + linkRect.height / 2 - contentOffsetH / 2;
        // @todo refine this.
        // @todo handle inViewBottom.
        // @todo do not allow the viewport difference to push the arrow
        const topPos = (contentOffsetH / 2 - linkRect.height / 2);
        const inViewTop = (topPos + screenOffset) < linkRect.top;
        if (!inViewTop) dropdownPos.y += (topPos + screenOffset) - linkRect.top;
      }
      if (open === 'above' || open === 'below') {
        dropdownPos.x = linkRect.left + linkRect.width / 2 - contentOffsetW / 2;
      }
      if (open === 'below') dropdownPos.y = linkRect.bottom - navRect.top;
      if (open === 'above') dropdownPos.y = (linkRect.top - navRect.top) - contentOffsetH;
      if (open === 'left') dropdownPos.x = linkRect.left - contentOffsetW;
      if (open === 'right') dropdownPos.x = linkRect.right;

      // Calculate arrow position.
      const arrowPos = {};
      if (open === 'left' || open === 'right') {
        arrowPos.y = (linkRect.top - navRect.top) + linkRect.height / 2;
      }
      if (open === 'above' || open === 'below') {
        arrowPos.x = linkRect.left + linkRect.width / 2;
      }
      if (open === 'below') arrowPos.y = linkRect.bottom - navRect.top;
      if (open === 'above') arrowPos.y = linkRect.top - navRect.top;
      if (open === 'left') arrowPos.x = linkRect.left;
      if (open === 'right') arrowPos.x = linkRect.right;

      // @todo determine what to do when content is too close to the edge of x/y viewport.
      // const rightSide = linkRect.left + linkRect.width / 2 + contentOffsetW / 2;
      // if (rightSide > bodyOffsetWidth) {
      //   pos = pos - (rightSide - bodyOffsetWidth) - this.screenOffset;
      // }

      this.clearDisableTransitionTimeout();
      this.setEnableTransitionTimeout();


      // This works for horizontal and vertical downward open
      this.styles.container = { transform: `translate(${dropdownPos.x}px, ${dropdownPos.y}px)`, width: `${contentOffsetW}px`, height: `${contentOffsetH}px` };
      this.styles.arrow = { transform: `translate(${arrowPos.x}px, ${arrowPos.y}px) rotate(45deg)` };

      // @todo determine if scaling is needed....
      // const bgTransforms = [
      //   `translate(${dropdownPosX}px, ${dropdownPosY}px)`,
      //   `scaleX(${ratioWidth})`,
      //   `scaleY(${ratioHeight})`,
      // ];
      // this.styles.background = {
      //   transform: bgTransforms.join(' '),
      // };
      this.styles.background = { transform: `translate(${dropdownPos.x}px, ${dropdownPos.y}px)`, width: `${contentOffsetW}px`, height: `${contentOffsetH}px` };

      const { children } = content;
      if (children) this.styles.innerBackground = { transform: `translate(${children[0].offsetWidth / ratioWidth}px ,${children[0].offsetHeight / ratioHeight}px)` };
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
  $self: &;
  position: relative;
  // @todo perspective _must_ be placed on the overall wrapper
  // otherwise z-index will have issues due to how browder stacks perspective
  // perspective: 2000px;
}
</style>
