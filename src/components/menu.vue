<template>
  <aside class="leaders leaders--no-transition">
    <nav class="leaders__navbar">
      <ul class="leaders__nav">
        <li class="leaders__nav-item">
          <component
            :is="item.element || 'button'"
            v-for="item in items"
            ref="links"
            :key="item.id"
            :data-dropdown-id="item.id"
            class="leaders__nav-link"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span>{{ item.label }}</span>
          </component>
        </li>
      </ul>
    </nav>
    <div class="leaders__dropdown">
      <div ref="background" class="leaders__background">
        <div ref="backgroundAlt" class="leaders__background-alt" />
      </div>
      <div
        ref="arrow"
        class="vsm-arrow"
      />
      <div
        ref="dropdownContainer"
        class="vsm-dropdown-container"
      >
        <div
          v-for="item in items"
          :key="item.id"
          ref="sections"
          class="leaders__dropdown-section"
          :data-dropdown-id="item.id"
          aria-hidden="false"
        >
          <div class="vsm-dropdown-content">
            <slot :item="item" />
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
// The PointerEvent interface represents the state of a DOM event
const pointerEvent = window.PointerEvent ? {
  end: 'pointerup',
  enter: 'pointerenter',
  leave: 'pointerleave',
} : {
  end: 'touchend',
  enter: 'mouseenter',
  leave: 'mouseleave',
};

export default {
  name: 'VsmMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
    baseWidth: {
      type: [Number, String],
      default: 380,
      validator: val => +val > 0,
    },
    baseHeight: {
      type: [Number, String],
      default: 400,
      validator: val => +val > 0,
    },
    screenOffset: {
      type: [Number, String],
      default: 10,
      validator: val => +val > 0,
    },
  },
  computed: {
    hasDropdownEls() {
      return this.$refs.links || [];
    },
    sectionEls() {
      const sections = this.$refs.sections || [];

      return sections.map(el => ({
        el,
        name: el.getAttribute('data-dropdown-id'),
        content: el.children[0],
      }));
    },
  },
  mounted() {
    this.registerGlobalEvents();
    this.registerDropdownElsEvents();
    this.registerDropdownContainerEvents();
  },

  beforeDestroy() {
    this.unregisterGlobalEvents();
  },

  methods: {
    registerGlobalEvents() {
      document.addEventListener('touchmove', this.touchMoveHandler);
      document.addEventListener('touchstart', this.touchStartHandler);
      document.body.addEventListener(pointerEvent.end, this.eventEndHandler);
    },
    registerDropdownElsEvents() {
      this.hasDropdownEls.forEach((el) => {
        // Events have been registered
        if (el.$vsm_menu) return;

        el.addEventListener('focusin', () => {
          this.stopCloseTimeout();
          this.openDropdown(el);
        });

        el.addEventListener(pointerEvent.enter, (evt) => {
          if (evt.pointerType !== 'touch') {
            this.stopCloseTimeout();
            this.openDropdown(el);
          }
        });

        el.addEventListener(pointerEvent.end, (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          this.toggleDropdown(el);
        });

        el.addEventListener(pointerEvent.leave, (evt) => {
          if (evt.pointerType !== 'touch') {
            this.startCloseTimeout();
          }
        });

        el.$vsm_menu = true; // eslint-disable-line no-param-reassign
      });
    },
    registerDropdownContainerEvents() {
      // Events have been registered
      if (this.$refs.dropdownContainer.$vsm_menu) return;

      this.$refs.dropdownContainer.addEventListener(pointerEvent.end, (evt) => {
        evt.stopPropagation();
      });

      this.$refs.dropdownContainer.addEventListener(pointerEvent.enter, (evt) => {
        if (evt.pointerType !== 'touch') {
          this.stopCloseTimeout();
        }
      });

      this.$refs.dropdownContainer.addEventListener(pointerEvent.leave, (evt) => {
        if (evt.pointerType !== 'touch') {
          this.startCloseTimeout();
        }
      });

      this.$refs.dropdownContainer.$vsm_menu = true;
    },
    unregisterGlobalEvents() {
      document.removeEventListener('touchmove', this.touchMoveHandler);
      document.removeEventListener('touchstart', this.touchStartHandler);
      document.body.removeEventListener(pointerEvent.end, this.eventEndHandler);
    },
    toggleDropdown(el) {
      if (this.activeDropdown === el) {
        this.closeDropdown();
      } else {
        this.openDropdown(el);
      }
    },
    openDropdown(el) {
      if (this.activeDropdown === el) return;

      this.$emit('open-dropdown', el);

      this.$el.classList.add('vsm-overlay-active');
      this.$el.classList.add('leaders--dropdown-active');
      this.activeDropdown = el;
      this.activeDropdown.setAttribute('aria-expanded', 'true');
      this.hasDropdownEls.forEach(dd => dd.classList.remove('leaders__nav-link--active'));
      el.classList.add('leaders__nav-link--active');

      const activeDataDropdown = el.getAttribute('data-dropdown-id');
      let direction = 'leaders__dropdown-section--left';
      let offsetWidth;
      let offsetHeight;
      let content;

      this.sectionEls.forEach((item) => {
        item.el.classList.remove('leaders__dropdown-section--active');
        item.el.classList.remove('leaders__dropdown-section--left');
        item.el.classList.remove('leaders__dropdown-section--right');

        if (item.name === activeDataDropdown) {
          item.el.setAttribute('aria-hidden', 'false');
          item.el.classList.add('leaders__dropdown-section--active');
          direction = 'leaders__dropdown-section--right';
          offsetWidth = item.content.offsetWidth; // eslint-disable-line
          offsetHeight = item.content.offsetHeight; // eslint-disable-line
          content = item.content; // eslint-disable-line
        } else {
          item.el.classList.add(direction);
          item.el.setAttribute('aria-hidden', 'true');
        }
      });

      const bodyOffset = document.body.offsetWidth;

      // Crop the width of the content if it goes beyond the width of the screen
      if (offsetWidth > bodyOffset - (+this.screenOffset * 2)) {
        offsetWidth = bodyOffset - (+this.screenOffset * 2);
      }

      const ratioWidth = offsetWidth / +this.baseWidth;
      const ratioHeight = offsetHeight / +this.baseHeight;
      const rect = el.getBoundingClientRect();
      let pos = Math.round(Math.max(rect.left + rect.width / 2 - offsetWidth / 2, 10));

      const rightSide = rect.left + rect.width / 2 + offsetWidth / 2;
      if (rightSide > bodyOffset) {
        pos = pos - (rightSide - bodyOffset) - +this.screenOffset;
      }

      clearTimeout(this.disableTransitionTimeout);

      this.enableTransitionTimeout = setTimeout(() => {
        this.$el.classList.remove('leaders--no-transition');
      }, 50);

      this.$refs.dropdownContainer.style.transform = `translateX(${pos}px)`;
      this.$refs.dropdownContainer.style.width = `${offsetWidth}px`;
      this.$refs.dropdownContainer.style.height = `${offsetHeight}px`;

      this.$refs.arrow.style.transform = `translateX(${Math.round(rect.left + rect.width / 2)}px) rotate(45deg)`;
      this.$refs.background.style.transform = `translateX(${pos}px) scaleX(${ratioWidth}) scaleY(${ratioHeight})`;
      // @todo this will throw an error if  not children are defined.
      this.$refs.backgroundAlt.style.transform = `translateY(${content.children[0].offsetHeight / ratioHeight}px)`;
    },
    closeDropdown() {
      if (!this.activeDropdown) return;

      this.$emit('close-dropdown', this.activeDropdown);

      this.hasDropdownEls.forEach((el) => {
        el.classList.remove('leaders__nav-link--active');
      });

      const activeDropdownSection = this.$refs.dropdownContainer.querySelector('[aria-hidden="false"]');
      if (activeDropdownSection) {
        activeDropdownSection.setAttribute('aria-hidden', 'true');
      }

      clearTimeout(this.enableTransitionTimeout);

      this.disableTransitionTimeout = setTimeout(() => {
        this.$el.classList.add('leaders--no-transition');
      }, 50);

      this.$el.classList.remove('vsm-overlay-active');
      this.$el.classList.remove('leaders--dropdown-active');

      this.activeDropdown.setAttribute('aria-expanded', 'false');
      this.activeDropdown = undefined;
    },
    startCloseTimeout() {
      this.closeDropdownTimeout = setTimeout(() => {
        this.closeDropdown();
      }, 50);
    },
    stopCloseTimeout() {
      clearTimeout(this.closeDropdownTimeout);
    },
    touchMoveHandler() {
      this.isDragging = true;
    },
    touchStartHandler() {
      this.isDragging = false;
    },
    eventEndHandler() {
      if (!this.isDragging) {
        this.closeDropdown();
      }
    },
  },
};
/* eslint-disable */
</script>

<style lang="scss">
.leaders {
  $self: &;
  perspective: 2000px;

  &__navbar {
    display: flex;
  }

  &__nav {
    padding: 0;
    margin: 0;
  }

  &__nav-item  {
    display: flex;
    list-style: none;
  }

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
      &__background-alt {
        transition: none;
      }
    }
    .vsm-dropdown-container,
    .vsm-arrow {
      transition: none;
    }
  }
}

.vsm-arrow {
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

.vsm-arrow,
.vsm-dropdown-container {
  position: absolute;
  left: 0;
  transition-duration: .25s;
}

.vsm-dropdown-container {
  top: 0;
  width: 500px;
  overflow: hidden;
  transition-property: transform, width, height, -webkit-transform;
  transform: translateX(0);
  will-change: transform, width, height;
}

.vsm-dropdown-content {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
