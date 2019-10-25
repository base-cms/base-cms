<template>
  <container>
    <row>
      <!-- <leaders /> -->
      <test-menu :items="items">
        <template #default="data">
          <div class="content">
            This should have content for {{ data.item.label }}
          </div>
        </template>
      </test-menu>
    </row>
  </container>
</template>

<script>
import Container from './components/generic/container.vue';
// import Leaders from './components/leaders.vue';
import TestMenu from './components/menu.vue';
import Row from './components/generic/row.vue';

export default {
  components: {
    Container,
    // Leaders,
    TestMenu,
    Row,
  },

  data: () => ({
    items: [
      { id: 1, label: 'Robatech USA Inc', href: '#' },
      { id: 2, label: 'Schubert North America', href: '#' },
      { id: 3, label: 'Serpa Packaging Solutions', href: '#' },
      { id: 4, label: 'Soma America, Inc.', href: '#' },
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

// specific styles
.content {
  padding: 30px;
}

.vsm-menu {
  width: 100%;
  nav {
    display: flex;
    justify-content: center;
  }
}
</style>
