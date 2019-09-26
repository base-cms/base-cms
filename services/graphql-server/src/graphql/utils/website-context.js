const cleanUrl = (url) => {
  if (!url) return '';
  return `${url}`
    .trim()
    .replace(/\/+$/, '')
    .replace(/^https:\/\//, '')
    .replace(/^http:\/\//, '');
};

module.exports = (site) => {
  const s = {
    ...site,
    language: {
      primaryCode: 'en',
      subCode: 'us',
      ...site.language,
    },
  };
  s.url = cleanUrl(site.url);
  s.origin = `https://${cleanUrl(site.url)}`;
  return s;
};