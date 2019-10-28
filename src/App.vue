<template>
  <container>
    <row style="padding-top: 300px; padding-bottom: 300px; perspective: 1500px;">
      <leaders
        :items="items"
        nav-direction="vertical"
        open-direction="below"
        dropdown-align="center"
        arrow-align="center"
      >
        <template #default="data">
          <div class="content">
            <p>This should have content for {{ data.item.label }}</p>
            <p>Let's make it</p>
            <p><strong>Bigger!</strong></p>
          </div>
        </template>
      </leaders>

      <leaders
        :items="items"
        nav-direction="horizontal"
        open-direction="above"
        dropdown-align="center"
        arrow-align="center"
      >
        <template #default="data">
          <div class="content">
            <p>This should have content for {{ data.item.label }}</p>
            <p>Let's make it</p>
            <p><strong>Bigger!</strong></p>
          </div>
        </template>
      </leaders>
    </row>
  </container>
</template>

<script>
import Container from './components/generic/container.vue';
import Leaders from './components/leaders.vue';
import Row from './components/generic/row.vue';

export default {
  components: {
    Container,
    Leaders,
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

.leaders {
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  nav {
    display: flex;
    justify-content: center;
  }
}
</style>
