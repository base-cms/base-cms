const fetch = require('node-fetch');

module.exports = async ({ html, urls = [], exHost }) => {
  const pattern = new RegExp(`https://${exHost}/click/[a-f0-9]{24}.*`, 'i');
  const appendedUrls = await Promise.all(urls.map(async (url) => {
    const match = pattern.exec(url.value);
    if (match && match[0]) {
      const dataUrl = match[0].replace(/\/click\//, '/data/');
      const res = await fetch(dataUrl);
      if (res.status === 200) {
        const adData = await res.json();
        return { ...url, adData };
      }
    }
    return url;
  }));


  let replaced = html;
  appendedUrls.filter(url => url.adData).forEach((url) => {
    const { element, adData } = url;
    const dpm = `<!--DPM: ln="${adData.ad.name}" lc="Advertising" lcv="${adData.ad.advertiserName}" -->`;
    replaced = replaced.replace(element, `${element}${dpm}`);
  });
  return replaced;
};
