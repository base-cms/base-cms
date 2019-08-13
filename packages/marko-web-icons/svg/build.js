const fs = require('fs');
const path = require('path');

const vue = ({ name, contents }) => `
<template>
  <icon-wrapper
    name="${name}"
    :modifiers="modifiers"
  >
    <!-- eslint-disable-next-line -->
    ${contents}
  </icon-wrapper>
</template>

<script>
import IconWrapper from './_wrapper.vue';

export default {
  components: { IconWrapper },
  props: {
    modifiers: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>
`;

const build = () => {
  const dir = fs.readdirSync(__dirname);
  dir.forEach((filename) => {
    const filepath = path.join(__dirname, filename);
    const stats = fs.statSync(filepath);
    if (stats.isFile() && path.extname(filename) === '.svg') {
      const name = path.basename(filepath, '.svg');
      const contents = fs.readFileSync(filepath, 'utf8').toString();
      const template = vue({ name, contents });
      fs.writeFileSync(path.join(__dirname, 'vue', `${name}.vue`), template);
    }
  });
};

build();
