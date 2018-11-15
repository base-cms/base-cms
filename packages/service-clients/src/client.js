const { async } = require('@base-cms/common');
const Broker = require('./broker');

const { isArray } = Array;
const { seriesPromise } = async;

module.exports = ({ serviceName, waitForServices } = {}) => {
  if (!serviceName) throw new Error('The `serviceName` option must be specified.');

  const waitFor = [serviceName];
  if (isArray(waitForServices)) {
    waitFor.push(...waitForServices);
  } else if (waitForServices) {
    waitFor.push(waitForServices);
  }

  return class Client {
    /**
     *
     */
    constructor({ brokerOpts } = {}) {
      this.broker = Broker(brokerOpts);
    }

    /**
     *
     * @param {number} [timeout=2000] Wait for services timeout in milliseconds
     * @param {number} [interval] Wait for services check interval in milliseconds
     */
    connect(timeout = 2000, interval) {
      if (!this.promise) {
        this.promise = seriesPromise([
          async () => this.broker.start(),
          async () => this.broker.waitForServices(waitFor, timeout, interval),
        ]);
      }
      return this.promise;
    }

    /**
     *
     * @param {string} action The action name
     * @param  {...any} rest Additional args to pass to `broker.call`
     */
    async call(action, ...rest) {
      await this.connect();
      return this.broker.call(`${serviceName}.${action}`, ...rest);
    }

    /**
     *
     */
    stop() {
      return this.broker.stop();
    }
  };
};
