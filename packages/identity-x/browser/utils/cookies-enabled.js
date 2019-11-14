export default () => {
  try {
    document.cookie = 'cookietest=1';
    const created = document.cookie.indexOf('cookietest=') !== -1;
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return created;
  } catch (e) {
    return false;
  }
};
