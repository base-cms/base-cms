export default (path) => {
  const endpoint = path.replace(/^\/+/, '');
  const uri = `/__idx/${endpoint}`;
  return fetch(uri, {
    credentials: 'same-origin',
    method: 'get',
  });
};
