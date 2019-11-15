export default (path, body) => {
  const endpoint = path.replace(/^\/+/, '');
  const uri = `/__idx/${endpoint}`;
  return fetch(uri, {
    credentials: 'same-origin',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
};
