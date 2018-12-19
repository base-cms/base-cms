import { URL } from 'url';
import http from 'http';
import https from 'https';
import proxy from 'http-proxy-middleware';

export default (url, server) => {
  if (!url) throw new Error('No service URL was provided.');
  const parsed = new URL(url);

  const agentOpts = { keepAlive: true };
  const agent = parsed.protocol === 'https:' ? new https.Agent(agentOpts) : new http.Agent(agentOpts);

  server.use('/graphql', proxy({
    agent,
    target: url,
    changeOrigin: true,
    pathRewrite: { '^/graphql': '/' },
  }));
};
