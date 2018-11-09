export default (type) => {
  if (!type) return '';
  return type.split('-').map(lower => lower.replace(/^\w/, c => c.toUpperCase())).join(' ');
};
