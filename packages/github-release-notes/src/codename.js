const sources = require('./sources');

const shuffle = (array) => {
  const values = [...array];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [values[i], values[j]] = [values[j], values[i]]; // swap elements
  }
  return values;
};

module.exports = ({ num = 3 } = {}) => {
  const keys = shuffle(Object.keys(sources));

  const names = [];
  for (let i = 0; i < num; i += 1) {
    const { values } = sources[keys[i]];
    names.push(shuffle(values)[0]);
  }
  return names.join(' ');
};
