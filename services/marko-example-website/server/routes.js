module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ ping: 'pong' });
  });
};
