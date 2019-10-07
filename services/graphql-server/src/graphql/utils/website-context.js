module.exports = (site) => {
  const s = {
    imageHost: 'base.imgix.net',
    assetHost: 'cdn.baseplatform.io',
    ...site,
    language: {
      primaryCode: 'en',
      subCode: 'us',
      ...site.language,
    },
    date: {
      format: 'MMM Do, YYYY',
      timezone: 'America/Chicago',
      locale: 'en',
      ...site.date,
    },
  };
  s.origin = `https://${site.host}`;
  return s;
};
