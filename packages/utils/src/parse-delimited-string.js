module.exports = (value, delimiter = ',', {
  removeFalsy = true,
  trim = true,
} = {}) => {
  if (!value) return [];
  return String(value)
    .split(delimiter)
    .filter((v) => {
      if (removeFalsy) return v;
      return true;
    })
    .map((v) => {
      if (trim && v) return String(v).trim();
      return v;
    });
};
