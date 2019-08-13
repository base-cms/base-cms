const stringifyAttrs = attrs => Object.keys(attrs).reduce((arr, key) => {
  const value = attrs[key];
  if (value) arr.push(`${key}="${value}"`);
  return arr;
}, []).join(' ');

module.exports = (tag, { config }) => {
  const lazyload = config.lazyloadImages();
  const src = tag.get('src');
  const alt = tag.get('alt');
  const caption = tag.get('caption');
  const credit = tag.get('credit');

  const attrs = {
    'data-embed-type': tag.type,
    'data-embed-id': tag.id,
    'data-embed-align': tag.get('align'),
  };

  const imgAttrs = {
    class: lazyload ? 'lazyload' : null,
    src: lazyload ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : src,
    'data-src': lazyload ? src : null,
    alt,
  };
  const captionElement = caption ? `<span class="caption">${caption}</span>` : '';
  const creditElement = credit ? `<span class="credit">${credit}</span>` : '';

  const img = `<img ${stringifyAttrs(imgAttrs)}>${captionElement}${creditElement}`;
  return `<span ${stringifyAttrs(attrs)}>${img}</span>`;
};
