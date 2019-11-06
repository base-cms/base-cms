<template>
  <div class="leaders-row">
    <div
      v-for="(col, index) in columns"
      :key="index"
      :class="classes"
    >
      <slot :sections="col.sections" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: 1,
      validator: n => n >= 1 && n <= 4,
    },
    sections: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    classes() {
      const col = 'leaders-col';
      const classes = [col];
      if (this.number > 1) classes.push(`${col}--${this.number}`);
      return classes;
    },
    columns() {
      const { round } = Math;
      const sections = this.sections.slice();
      const inc = round(sections.length / this.number);
      const cols = [];
      for (let n = 0; n < this.number; n += 1) {
        const end = n === this.number - 1 ? sections.length : inc;
        cols.push({ sections: sections.splice(0, end) });
      }
      return cols;
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.leaders-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -$leaders-gutter-size;
  margin-left: -$leaders-gutter-size;
}

.leaders-col {
  position: relative;
  width: 100%;
  padding-right: $leaders-gutter-size;
  padding-left: $leaders-gutter-size;
}

.leaders-col--2 {
  flex: 0 0 50%;
  max-width: 50%;
}

.leaders-col--3 {
  flex: 0 0 33.333%;
  max-width: 33.333%;
}

.leaders-col--4 {
  flex: 0 0 25%;
  max-width: 25%;
}
</style>
