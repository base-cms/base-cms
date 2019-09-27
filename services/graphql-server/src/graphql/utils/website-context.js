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
  };
  s.origin = `https://${site.host}`;
  return s;
};
