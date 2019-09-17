export default (value) => {
  if (!value) return '';
  return `${value}`.trim().replace(/^\/+/, '').replace(/\/+$/, '');
};
