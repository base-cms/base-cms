<template>
  <container>
    <row>
      <aside class="leaders">
        <nav class="leaders__navbar">
          <ul class="leaders__nav" />
        </nav>
        <div class="leaders__dropdown">
          <div class="leaders__dropdown-bg">
            <div class="leaders__dropdown-bg-inner" />
          </div>
          <div class="leaders__dropdown-arrow" />
        </div>
      </aside>
    </row>
  </container>
</template>

<script>
import Container from './components/generic/container.vue';
import Row from './components/generic/row.vue';

export default {
  components: {
    Container,
    Row,
  },

  data: () => ({
    items: [
      { label: 'Robatech USA Inc', href: '#' },
      { label: 'Schubert North America', href: '#' },
      { label: 'Serpa Packaging Solutions', href: '#' },
      { label: 'Soma America, Inc.', href: '#' },
    ],
  }),
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
}

// .list-group {
//   display: flex;
//   justify-content: center;
//   width: 60vw;
//   padding: 1rem;
//   margin: 0 auto;
//   font-size: 17px;
//   &__item {
//     display: block;
//     width: 100%;
//     padding: .25rem;
//     color: #6b7c93;
//     text-align: center;
//     text-decoration: none;

//     &:hover {
//       color: #32325d;
//       text-decoration: none;
//     }
//   }
// }
</style>
