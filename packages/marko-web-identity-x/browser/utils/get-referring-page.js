module.exports = () => {
  const { referrer } = document;
  const { origin } = window;
  if (!referrer) return '/'; // no referrer
  if (referrer.indexOf(origin) !== 0) return '/'; // off-site referrer
  return referrer.replace(origin, '');
};
