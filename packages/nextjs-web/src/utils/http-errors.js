export default {
  notFound(message = 'No record found.') {
    const e = new Error(message);
    e.code = 'ENOENT';
    e.statusCode = 404;
    return e;
  },
};
