<template>
  <div class="leaders">
    <h1>Hello World!</h1>
    <list-group :items="items">
      <template slot-scope="leader">
        {{ leader.label }}
      </template>
    </list-group>
  </div>
</template>

<script>
import ListGroup from './components/list-group.vue';

export default {
  components: { ListGroup },

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

.leaders {
  font-family: Muli, sans-serif;
}
</style>
