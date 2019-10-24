<template>
  <container>
    <row>
      <column>
        <div class="leaders">
          <h1>Hello World!</h1>
          <list-group :items="items">
            <template slot-scope="leader">
              {{ leader.label }}
            </template>
          </list-group>
        </div>
      </column>
    </row>
  </container>
</template>

<script>
import Column from './components/generic/column.vue';
import Container from './components/generic/container.vue';
import ListGroup from './components/list-group.vue';
import Row from './components/generic/row.vue';

export default {
  components: {
    Column,
    Container,
    ListGroup,
    Row,
  },

  data: () => ({
    items: [
      { label: 'Foo' },
      { label: 'Bar' },
      { label: 'Baz' },
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
</style>
