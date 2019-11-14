const cookie = require('cookie');

const COOKIE_NAME = '__idx';
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 365 * 2;

const setTo = (res, token) => {
  res.cookie(COOKIE_NAME, token, { maxAge: COOKIE_MAX_AGE, httpOnly: false });
};

const getFrom = (req) => {
  try {
    const cookies = cookie.parse(req.get('cookie') || '');
    const { [COOKIE_NAME]: token } = cookies;
    return token;
  } catch (e) {
    // @todo log this error.
    return undefined;
  }
};

const removeFrom = (res) => {
  res.clearCookie(COOKIE_NAME);
};

module.exports = {
  setTo,
  getFrom,
  removeFrom,
};
