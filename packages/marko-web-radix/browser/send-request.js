import url from './url';

export default ({
  appId,
  method,
  endpoint,
  body,
}) => fetch(`${url}${endpoint}`, {
  method,
  headers: {
    'x-radix-appid': appId,
    'x-requested-with': 'XMLHttpRequest',
    ...(body && { 'content-type': 'application/json' }),
  },
  cache: 'no-cache',
  credentials: 'same-origin',
  ...(body && { body: JSON.stringify(body) }),
});
