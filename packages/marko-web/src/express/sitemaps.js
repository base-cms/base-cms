module.exports = (app) => {
  /**
   * @todo Implement this using the remote sitemap service.
   */
  app.get('/sitemap.xml', (req, res) => {
    res.append('Content-Type', 'text/xml; charset=UTF-8');
    res.send('<?xml version="1.0" encoding="utf-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></sitemapindex>');
  });

  /**
   * @todo Implement this using the remote sitemap service.
   */
  app.get('/sitemap-google-news.xml', (req, res) => {
    res.append('Content-Type', 'text/xml; charset=UTF-8');
    res.send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"></urlset>');
  });
};
