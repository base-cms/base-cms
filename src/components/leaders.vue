<template>
  <aside class="leaders">
    <navbar>
      <nav-container>
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
      :transitions-disabled="transitionsDisabled"
      :is-active="isDropdownActive"
    >
      <div ref="background" class="leaders__dropdown-bg">
        <div ref="backgroundAlt" class="leaders__dropdown-inner-bg" />
      </div>
      <div ref="arrow" class="leaders__dropdown-arrow" />
      <dropdown-container
        ref="dropdownContainer"
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
import Navbar from './leaders/navbar.vue';
import Dropdown from './leaders/dropdown.vue';
import DropdownContainer from './leaders/dropdown-container.vue';
import NavContainer from './leaders/nav-container.vue';
import NavItem from './leaders/nav-item.vue';
import NavLink from './leaders/nav-link.vue';
import DropdownSection from './leaders/dropdown-section.vue';
import pointerEvents from './leaders/pointer-events';

const pointerEvent = pointerEvents();

export default {
  components: {
    Dropdown,
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
  }),

  computed: {
    rootElement() {
      return this.$el;
    },
    dropdownContainerElement() {
      return this.$refs.dropdownContainer.$el;
    },
    sectionElements() {
      if (!this.$refs.sections) return [];
      return this.$refs.sections.map(ref => ref.$el);
    },
    arrowElement() {
      return this.$refs.arrow;
    },
    backgroundElement() {
      return this.$refs.background;
    },
    backgroundAltElement() {
      return this.$refs.backgroundAlt;
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


      const section = this.sectionElements[activeIndex];
      if (!section) throw new Error(`No dropdown section was found for index ${activeIndex}`);
      const [content] = section.children;
      let contentOffsetW = content.offsetWidth;
      const contentOffsetH = content.offsetHeight;

      const { offsetWidth: bodyOffsetWidth } = document.body;
      const allowedWidth = bodyOffsetWidth - (this.screenOffset * 2);

      // Crop the width of the content if it goes beyond the width of the screen
      if (contentOffsetW > allowedWidth - (this.screenOffset * 2)) {
        contentOffsetW = bodyOffsetWidth - (this.screenOffset * 2);
      }

      const ratioWidth = contentOffsetW / this.dropdownWidth;
      const ratioHeight = contentOffsetH / this.dropdownHeight;
      const linkRect = link.getBoundingClientRect();

      const max = Math.max(linkRect.left + linkRect.width / 2 - contentOffsetW / 2, 10);
      let pos = Math.round(max);

      const rightSide = linkRect.left + linkRect.width / 2 + contentOffsetW / 2;
      if (rightSide > bodyOffsetWidth) {
        pos = pos - (rightSide - bodyOffsetWidth) - this.screenOffset;
      }

      this.clearDisableTransitionTimeout();
      this.setEnableTransitionTimeout();

      const container = this.dropdownContainerElement;
      container.style.transform = `translateX(${pos}px)`;
      container.style.width = `${contentOffsetW}px`;
      container.style.height = `${contentOffsetH}px`;

      this.arrowElement.style.transform = `translateX(${Math.round(linkRect.left + linkRect.width / 2)}px) rotate(45deg)`;
      this.backgroundElement.style.transform = `translateX(${pos}px) scaleX(${ratioWidth}) scaleY(${ratioHeight})`;
      // @todo this will throw an error if no children are defined.
      this.backgroundAltElement.style.transform = `translateY(${content.children[0].offsetHeight / ratioHeight}px)`;
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
  perspective: 2000px;

  &__dropdown-bg {
    width: 380px;
    height: 400px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 50px 100px -20px rgba(50, 50, 93, .25), 0 30px 60px -30px rgba(0, 0, 0, .3), 0 -18px 60px -10px rgba(0, 0, 0, .025);
    transform: translateX(0);
    transform-origin: 0 0;
  }

  &__dropdown-inner-bg {
    right: 0;
    height: 1000px;
    background: #f6f9fc;
  }

  &__dropdown-bg,
  &__dropdown-inner-bg {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
    transition-duration: .25s;
    transition-property: transform, -webkit-transform;
  }

  &__dropdown-arrow {
    top: -6px;
    width: 12px;
    height: 12px;
    margin: 0 0 0 -6px;
    background: #fff;
    border-radius: 4px 0 0;
    box-shadow: -3px -3px 5px rgba(82, 95, 127, .04);
    transition-property: transform, -webkit-transform;
    transform: rotate(45deg);
    will-change: transform;
  }

  &__dropdown-arrow,
  &__dropdown-container {
    position: absolute;
    left: 0;
    transition-duration: .25s;
  }

  &__dropdown-container {
    top: 0;
    width: 500px;
    overflow: hidden;
    transition-property: transform, width, height, -webkit-transform;
    transform: translateX(0);
    will-change: transform, width, height;
  }

  &__dropdown-section {
    pointer-events: none;
    opacity: 0;
    will-change: transform, opacity;
    transition-duration: .25s;
    transition-property: transform, opacity, -webkit-transform;
    &--active {
      opacity: 1;
      transform: translateX(0);
    }
    &--left {
      transform: translateX(-150px);
    }
    &--right {
      transform: translateX(150px);
    }
  }

  &__dropdown-content {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
