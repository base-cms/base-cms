import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import Vue from '@base-cms/marko-web/browser/vue';

import createClient from '../utils/create-client';

export default (config) => {
  if (config.isSentryEnabled()) {
    const isDev = ['0.0.0.0', 'localhost'].includes(window.location.hostname);
    Sentry.init({
      dsn: config.getSentryDsn(),
      integrations: [new Integrations.Vue({ Vue, attachProps: true })],
      environment: isDev ? 'development' : 'production',
      debug: isDev,
    });
  }
  return createClient({ mountPoint: config.getMountPoint() });
};
