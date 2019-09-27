module.exports = (title, config) => `The latest ${(title || '').toLowerCase()} from ${config.website('name')}`;
