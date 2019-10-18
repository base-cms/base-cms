/**
 * Iterates over a MongoDB cursor, allowing an awaitable callback function.
 *
 * @param {Cursor} cursor The MongoDB cursor object.
 * @param {function} cb The function to call on each document. Can be async.
 */
const iterateCursor = async (cursor, cb) => {
  if (await cursor.hasNext()) {
    const doc = await cursor.next();
    await cb(doc);
    await iterateCursor(cursor, cb);
  }
};

module.exports = iterateCursor;
