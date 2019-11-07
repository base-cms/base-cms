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
