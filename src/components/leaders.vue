<template>
  <aside class="leaders leaders--no-transition">
    <navbar>
      <nav-container>
        <nav-item
          v-for="item in items"
          :key="item.id"
        >
          <nav-link
            tag="button"
            :dropdown-id="item.id"
            :active-dropdown-id="activeDropdownId"
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
    <div class="leaders__dropdown">
      <div ref="background" class="leaders__background">
        <div ref="backgroundAlt" class="leaders__background-alt" />
      </div>
      <div ref="arrow" class="leaders__arrow" />
      <div ref="dropdownContainer" class="leaders__dropdown-container">
        <dropdown-section
          v-for="item in items"
          ref="sections"
          :key="item.id"
          :dropdown-id="item.id"
          :active-dropdown-id="activeDropdownId"
        >
          <slot :item="item" />
        </dropdown-section>
      </div>
    </div>
  </aside>
</template>

<script>
import Navbar from './leaders/navbar.vue';
import NavContainer from './leaders/nav-container.vue';
import NavItem from './leaders/nav-item.vue';
import NavLink from './leaders/nav-link.vue';
import DropdownSection from './leaders/dropdown-section.vue';
import pointerEvents from './leaders/pointer-events';

const pointerEvent = pointerEvents();

export default {
  components: {
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
    activeDropdownId: null,

    activeDropdownSection: null,
    isDragging: false,
    closeTimeout: null,
    enableTransitionTimeout: null,
    disableTransitionTimeout: null,
    activeRootClass: 'leaders--dropdown-active',
    noTransitionClass: 'leaders--no-transition',
    activeSectionClass: 'leaders__dropdown-section--active',
    leftSectionClass: 'leaders__dropdown-section--left',
    rightSectionClass: 'leaders__dropdown-section--right',
  }),

  computed: {
    rootElement() {
      return this.$el;
    },
    dropdownContainerElement() {
      return this.$refs.dropdownContainer;
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
  },

  mounted() {
    this.addGlobalEventListeners();
    this.addContainerEventListeners();
  },

  beforeDestroy() {
    this.removeGlobalEventListeners();
  },

  methods: {
    addGlobalEventListeners() {
      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchstart', this.onTouchStart);
      document.body.addEventListener(pointerEvent.end, this.onPointerEnd);
    },

    onLinkFocus({ dropdownId, link }) {
      this.clearCloseTimeout();
      this.openDropdownFor({ link, activeId: dropdownId });
    },

    onLinkEnter({ dropdownId, link, event }) {
      if (event.pointerType !== 'touch') {
        this.clearCloseTimeout();
        this.openDropdownFor({ link, activeId: dropdownId });
      }
    },

    onLinkEnd({ dropdownId, link, event }) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleDropdownFor({ link, activeId: dropdownId });
    },

    onLinkLeave({ event }) {
      if (event.pointerType !== 'touch') {
        this.setCloseTimeout();
      }
    },

    addContainerEventListeners() {
      // Events have been registered
      if (this.dropdownContainerElement.dataset.ready) return;

      this.dropdownContainerElement.addEventListener(pointerEvent.end, (evt) => {
        evt.stopPropagation();
      });

      this.dropdownContainerElement.addEventListener(pointerEvent.enter, (evt) => {
        if (evt.pointerType !== 'touch') {
          this.clearCloseTimeout();
        }
      });

      this.dropdownContainerElement.addEventListener(pointerEvent.leave, (evt) => {
        if (evt.pointerType !== 'touch') {
          this.setCloseTimeout();
        }
      });

      this.dropdownContainerElement.dataset.ready = true;
    },

    removeGlobalEventListeners() {
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchstart', this.onTouchStart);
      document.body.removeEventListener(pointerEvent.end, this.onPointerEnd);
    },

    toggleDropdownFor({ link, activeId }) {
      if (this.activeDropdownId === activeId) {
        this.closeDropdown();
      } else {
        this.openDropdownFor({ link, activeId });
      }
    },

    openDropdownFor({ link, activeId }) {
      if (this.activeDropdownId === activeId) return;

      // Set active classes to root element.
      this.setActiveRootClass();

      // Set active dropdown id.
      this.activeDropdownId = activeId;

      let content;
      let contentOffsetW;
      let contentOffsetH;
      let direction = this.leftSectionClass;

      this.sectionElements.forEach((section) => {
        this.resetSectionAttrs(section);
        const { dropdownId } = section.dataset;

        // @todo determine a better way to check this.
        if (`${dropdownId}` === `${activeId}`) {
          this.activeDropdownSection = section;
          this.setActiveSectionAttrs(section);
          [content] = section.children;
          contentOffsetW = content.offsetWidth;
          contentOffsetH = content.offsetHeight;
          direction = this.rightSectionClass;
        } else {
          section.classList.add(direction);
          section.setAttribute('aria-hidden', true);
        }
      });

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
      if (!this.activeDropdownId) return;

      this.activeDropdownSection.setAttribute('aria-hidden', true);

      this.clearEnableTransitionTimeout();
      this.setDisableTransitionTimeout();

      // Clear active classes on the root element.
      this.clearActiveRootClass();

      // Unset active dropdown.
      this.activeDropdownId = null;
      this.activeDropdownSection = undefined;
    },

    setCloseTimeout() {
      this.closeTimeout = setTimeout(() => this.closeDropdown(), 50);
    },

    clearCloseTimeout() {
      clearTimeout(this.closeTimeout);
    },

    setEnableTransitionTimeout() {
      this.enableTransitionTimeout = setTimeout(() => {
        this.rootElement.classList.remove(this.noTransitionClass);
      }, 50);
    },

    clearEnableTransitionTimeout() {
      clearTimeout(this.enableTransitionTimeout);
    },

    setDisableTransitionTimeout() {
      this.disableTransitionTimeout = setTimeout(() => {
        this.rootElement.classList.add(this.noTransitionClass);
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

    resetSectionAttrs(section) {
      section.classList.remove(this.activeSectionClass);
      section.classList.remove(this.leftSectionClass);
      section.classList.remove(this.rightSectionClass);
    },

    setActiveSectionAttrs(section) {
      section.classList.add(this.activeSectionClass);
      section.setAttribute('aria-hidden', false);
    },

    setActiveRootClass() {
      this.rootElement.classList.add(this.activeRootClass);
    },

    clearActiveRootClass() {
      this.rootElement.classList.remove(this.activeRootClass);
    },
  },
};
/* eslint-disable */
</script>

<style lang="scss">
.leaders {
  $self: &;
  perspective: 2000px;

  &__dropdown {
    position: absolute;
    top: 50px;
    right: 0;
    left: 0;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition-duration: .25s;
    transition-property: transform, opacity, -webkit-transform;
    transform: rotateX(-15deg);
    transform-origin: 50% -50px;
    will-change: transform, opacity;
  }

  &__background {
    width: 380px;
    height: 400px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 50px 100px -20px rgba(50, 50, 93, .25), 0 30px 60px -30px rgba(0, 0, 0, .3), 0 -18px 60px -10px rgba(0, 0, 0, .025);
    transform: translateX(0);
    transform-origin: 0 0;
  }

  &__background-alt {
    right: 0;
    height: 1000px;
    background: #f6f9fc;
  }

  &__background,
  &__background-alt {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
    transition-duration: .25s;
    transition-property: transform, -webkit-transform;
  }

  &__arrow {
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

  &__arrow,
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

  &--dropdown-active {
    #{ $self } {
      &__dropdown {
        pointer-events: auto;
        opacity: 1;
        transform: none;
      }
      &__dropdown-section {
        &--active {
          pointer-events: auto;
        }
      }
    }
  }

  &--no-transition {
    #{ $self } {
      &__dropdown-section,
      &__background,
      &__background-alt,
      &__arrow,
      &__dropdown-container {
        transition: none;
      }
    }
  }
}
</style>
