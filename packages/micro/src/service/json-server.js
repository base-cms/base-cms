const micro = require('micro');
const { get } = require('@base-cms/object-path');
const { createTerminus } = require('@godaddy/terminus');
const isFn = require('../utils/is-function');

const createParamError = require('./param-error');
const jsonErrors = require('./json-errors');

const { env } = process;
const { json, createError } = micro;

const wait = ms => new Promise(resolve => setTimeout(resolve, parseInt(ms, 10)));

/**
 * Starts a micro json service server.
 *
 * @param {object}   args
 * @param {object}   args.actions The service actions to load.
 * @param {function} [args.context] A function to generate context. Will be passed to all actions.
 * @param {boolean}  [args.enableLogging=true] Whether to enable server log messages.
 * @param {string[]} [args.signals]
 * @param {string}   [args.healthCheckPath=/_health]
 * @param {number}   [args.port=80]
 * @param {number}   [args.exposedPort=80]
 * @param {function} [args.onError]
 * @param {function} [args.onStart]
 * @param {function} [args.onSignal]
 * @param {function} [args.beforeShutdown]
 * @param {function} [args.onShutdown]
 * @param {function} [args.onHealthCheck]
 * @param {function} [args.createErrorResponse]
 */
module.exports = async ({
  actions = {},
  context,
  enableLogging = true,
  signals = ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'],
  healthCheckPath = '/_health',
  port = 80,
  exposedPort = 80,
  onError,
  onStart,
  onSignal,
  beforeShutdown,
  onShutdown,
  onHealthCheck,
  createErrorResponse,
}) => {
  // Create logger.
  const log = (message) => {
    const { log: emit } = console;
    if (enableLogging) emit(`> ${message}`);
  };

  // Create error handler.
  const errorHandler = isFn(onError) ? onError : () => {};

  // Await required services here...
  if (isFn(onStart)) await onStart();

  const server = micro(jsonErrors(async (req, res) => {
    const input = await json(req);
    const { action: path, params, meta } = input;
    if (!path) throw createError(400, 'No action provided.');

    const fn = get(actions, path);
    if (!isFn(fn)) throw createParamError('action', path, Object.keys(actions));

    const contextData = isFn(context) ? await context({ req, res, input }) : context;

    const data = await fn(params || {}, {
      req,
      res,
      meta: meta || {},
      context: contextData || {},
    });
    return { data };
  }, errorHandler, createErrorResponse));

  createTerminus(server, {
    timeout: parseInt(env.TERMINUS_TIMEOUT || 1000, 10),
    signals,
    healthChecks: {
      [healthCheckPath]: async () => {
        if (isFn(onHealthCheck)) return onHealthCheck();
        return { ping: 'pong' };
      },
    },
    onSignal: async () => {
      // Stop required services here...
      log('Signal received, running cleanup hook...');
      try {
        if (isFn(onSignal)) await onSignal();
      } catch (e) {
        errorHandler(e);
        log('CLEANUP ERRORS DETECTED!');
      } finally {
        log('Cleanup complete.');
      }
    },
    beforeShutdown: async () => {
      log('Running before shutdown hook...');
      try {
        if (isFn(beforeShutdown)) await beforeShutdown();
        const { TERMINUS_SHUTDOWN_DELAY } = env;
        if (TERMINUS_SHUTDOWN_DELAY) {
          log(`Delaying shutdown by ${TERMINUS_SHUTDOWN_DELAY}ms...`);
          await wait(TERMINUS_SHUTDOWN_DELAY);
        }
      } catch (e) {
        errorHandler(e);
        log('BEFORE SHUTDOWN ERRORS DETECTED!');
      } finally {
        log('Before shutdown complete.');
      }
    },
    onShutdown: async () => {
      log('Running shutdown hook...');
      try {
        if (isFn(onShutdown)) await onShutdown();
      } catch (e) {
        errorHandler(e);
        log('SHUTDOWN ERRORS DETECTED!');
      } finally {
        log('Shutdown complete.');
      }
    },
  });

  server.listen(port, () => log(`Ready on http://0.0.0.0:${exposedPort}`));
};
