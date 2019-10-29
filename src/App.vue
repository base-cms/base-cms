<template>
  <container style="padding-top: 200px; padding-bottom: 200px; perspective: 1500px;">
    <row>
      <h3>Vertical Left</h3>
      <leaders
        :items="items"
        nav-direction="vertical"
        open="left"
      >
        <template #default="data">
          <sample-content :label="data.item.label" />
        </template>
      </leaders>
    </row>
    <row>
      <h3>Vertical Right</h3>
      <leaders
        :items="items"
        nav-direction="vertical"
        open="right"
      >
        <template #default="data">
          <sample-content :label="data.item.label" />
        </template>
      </leaders>
    </row>
    <row>
      <h3>Vertical Above</h3>
      <leaders
        :items="items"
        nav-direction="vertical"
        open="above"
      >
        <template #default="data">
          <sample-content :label="data.item.label" />
        </template>
      </leaders>
    </row>
    <row>
      <h3>Vertical Below</h3>
      <leaders
        :items="items"
        nav-direction="vertical"
        open="below"
      >
        <template #default="data">
          <sample-content :label="data.item.label" />
        </template>
      </leaders>
    </row>

    <row>
      <h3>Horizontal Left</h3>
      <leaders
        :items="items"
        nav-direction="horizontal"
        open="left"
      >
        <template #default="data">
          <sample-content :label="data.item.label" />
        </template>
      </leaders>
    </row>
    <row>
      <h3>Horizontal Right</h3>
      <leaders
        :items="items"
        nav-direction="horizontal"
        open="right"
      >
        <template #default="data">
          <sample-content :label="data.item.label" />
        </template>
      </leaders>
    </row>
    <row>
      <h3>Horizontal Above</h3>
      <leaders
        :items="items"
        nav-direction="horizontal"
        open="above"
      >
        <template #default="data">
          <sample-content :label="data.item.label" />
        </template>
      </leaders>
    </row>
    <row>
      <h3>Horizontal Below</h3>
      <leaders
        :items="items"
        nav-direction="horizontal"
        open="below"
      >
        <template #default="data">
          <sample-content :label="data.item.label" />
        </template>
      </leaders>
    </row>
  </container>
</template>

<script>
import SampleContent from './components/sample-content.vue';
import Container from './components/generic/container.vue';
import Leaders from './components/leaders.vue';
import Row from './components/generic/row.vue';

export default {
  components: {
    Container,
    Leaders,
    Row,
    SampleContent,
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
