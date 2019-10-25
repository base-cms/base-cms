<template>
  <container>
    <row>
      <aside ref="root" class="leaders">
        <nav class="leaders__navbar">
          <ul class="leaders__nav">
            <li class="leaders__nav-item">
              <button
                v-for="item of items"
                ref="buttons"
                :key="item.id"
                :data-dropdown-id="item.id"
                class="leaders__nav-button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ item.label }}
              </button>
            </li>
          </ul>
        </nav>
        <div class="leaders__dropdown">
          <div class="leaders__dropdown-bg">
            <div class="leaders__dropdown-bg-inner" />
          </div>
          <div class="leaders__dropdown-arrow" />
          <div ref="sectionContainer" class="leaders__dropdown-sections">
            <section
              v-for="item of items"
              :key="item.id"
              :data-dropdown-section-id="item.id"
              class="leaders__dropdown-section"
            >
              <div class="leaders__dropdown-section-content-wrap">
                <div class="leaders__dropdown-section-content">
                  {{ item.label }}
                </div>
              </div>
            </section>
          </div>
        </div>
      </aside>
    </row>
  </container>
</template>

<script>
import Container from './components/generic/container.vue';
import Row from './components/generic/row.vue';

// Use generic PointerEvent when available, else fall back.
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
  components: {
    Container,
    Row,
  },

  data: () => ({
    items: [
      { id: 1, label: 'Robatech USA Inc', href: '#' },
      { id: 2, label: 'Schubert North America', href: '#' },
      { id: 3, label: 'Serpa Packaging Solutions', href: '#' },
      { id: 4, label: 'Soma America, Inc.', href: '#' },
    ],
    isDragging: false,
    closeTimeout: null,
    activeButtonClass: 'leaders__nav-button--active',
    activeRootClass: 'leaders--dropdown-active',
  }),

  computed: {
    buttonElements() {
      const { buttons } = this.$refs;
      return buttons && buttons.length ? buttons : [];
    },
    containerElement() {
      return this.$refs.sectionContainer;
    },
    rootElement() {
      return this.$refs.root;
    },
  },

  mounted() {
    this.addGlobalEventListeners();
    this.addButtonEventListeners();
    this.addSectionContainerEventListeners();
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

    addButtonEventListeners() {
      this.buttonElements.forEach((button) => {
        if (button.dataset.ready) return;

        button.addEventListener('focusin', () => {
          this.clearCloseTimeout();
          this.openDropdownFor(button);
        });

        button.addEventListener(pointerEvent.enter, (event) => {
          if (event.pointerType !== 'touch') {
            this.clearCloseTimeout();
            this.openDropdownFor(button);
          }
        });

        button.addEventListener(pointerEvent.end, (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.toggleDropdownFor(button);
        });

        button.addEventListener(pointerEvent.leave, (event) => {
          if (event.pointerType !== 'touch') this.setCloseTimeout();
        });

        // eslint-disable-next-line no-param-reassign
        button.dataset.ready = true;
      });
    },

    addSectionContainerEventListeners() {
      const container = this.containerElement;
      if (container.dataset.ready) return;

      container.addEventListener(pointerEvent.end, (event) => {
        event.stopPropagation();
      });

      container.addEventListener(pointerEvent.enter, (event) => {
        if (event.pointerType !== 'touch') this.clearCloseTimeout();
      });

      container.addEventListener(pointerEvent.leave, (event) => {
        if (event.pointerType !== 'touch') this.setCloseTimeout();
      });

      container.dataset.ready = true;
    },

    removeGlobalEventListeners() {
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchstart', this.onTouchStart);
      document.body.removeEventListener(pointerEvent.end, this.onPointerEnd);
    },

    toggleDropdownFor(button) {
      if (this.activeButton === button) {
        this.closeDropdown();
      } else {
        this.openDropdownFor(button);
      }
    },

    openDropdownFor(button) {
      console.log('openDropdownFor', button);

      // Set active classes to root element.
      this.setActiveRootClass();

      // Set active button item
      this.activeButton = button;
      this.clearActiveButtonAttrs();
      this.setActiveButtonAttrs(button);
    },

    closeDropdown() {
      console.log('closeDropdown');
      if (!this.activeButton) return;
      console.log('begin closing');

      // Clear/reset active button attributes.
      this.clearActiveButtonAttrs();

      // Clear active classes on the root element.
      this.clearActiveRootClass();
    },

    setCloseTimeout() {
      this.closeTimeout = setTimeout(() => this.closeDropdown(), 50);
    },

    clearCloseTimeout() {
      clearTimeout(this.closeTimeout);
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

    clearActiveButtonAttrs() {
      this.buttonElements.forEach((el) => {
        el.classList.remove(this.activeButtonClass);
        el.setAttribute('aria-expanded', false);
      });
    },

    setActiveButtonAttrs(button) {
      button.classList.add(this.activeButtonClass);
      button.setAttribute('aria-expanded', true);
    },

    setActiveRootClass() {
      this.rootElement.classList.add(this.activeRootClass);
    },

    clearActiveRootClass() {
      this.rootElement.classList.remove(this.activeRootClass);
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Muli:300,400,600&display=swap");
@import "./scss/variables";

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  line-height: 1.15;
}

body {
  margin: 0;
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-base;
  line-height: $line-height-base;
  color: #212529;
  text-align: left;
  background-color: #fff;
}

.leaders {
  $self: &;
  position: relative;
  width: 100%;
  background-color: #f5f9fc;
  border-bottom: 5px solid #ecf0fb;
  perspective: 2000px;

  &__navbar {
    margin: 0 10px;
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1024px;
    padding: 0;
    margin: 0 auto;
    list-style: none;
  }

  &__nav-item {
    display: flex;
    flex: 1;
    justify-content: center;
    list-style: none;
  }

  &__nav-button {
    padding: 10px 25px;
    margin: 0;
    font-family: inherit;
    font-size: 17px;
    color: #6b7c93;
    cursor: pointer;
    user-select: none;
    background: none;
    border: none;
    outline: none;
    transition: color 100ms ease;

    &:hover {
      color: #32325d;
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
    transition-duration: 250ms;
    transition-property: transform, opacity;
    transform: rotateX(-15deg);
    transform-origin: 50% -50px;
    will-change: transform, opacity;
  }

  &__dropdown-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 380px;
    height: 400px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: $dropdown-menu-box-shadow;
    transition: none;
    transform: translateX(0);
    will-change: transform;
  }

  &__dropdown-bg-inner {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1000px;
    background-color: #f6f9fc;
    transition: none;
    will-change: transform;
  }

  &__dropdown-arrow {
    position: absolute;
    top: -6px;
    left: 0;
    width: 12px;
    height: 12px;
    margin: 0 0 0 -6px;
    background-color: #fff;
    border-radius: 4px 0 0;
    box-shadow: -3px -3px 5px rgba(82, 95, 127, .04);
    transition: none;
    transform: rotate(45deg);
    will-change: transform;
  }

  &__dropdown-sections {
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    overflow: hidden;
    transition: none;
    transform: translateX(0);
    will-change: transform, width, height;
  }

  &__dropdown-section {
    pointer-events: none;
    opacity: 0;
    transition: none;
    will-change: transform, opacity;
    &--active {
      pointer-events: auto;
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

  &__dropdown-section-content-wrap {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__dropdown-section-content {
    padding: 30px;
  }

  &--dropdown-active {
    #{ $self } {
      &__dropdown {
        pointer-events: auto;
        opacity: 1;
        transform: none;
      }
    }
  }
}
</style>
