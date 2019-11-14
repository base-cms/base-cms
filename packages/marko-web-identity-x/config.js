class IdentityXConfiguration {
  /**
   *
   * @param {string} appId
   * @param {string} sentryDsn
   */
  constructor(appId, sentryDsn, mountPoint = '/__idx') {
    if (!appId) throw new Error('Unable to configure IdentityX: no Application ID was provided.');
    this.appId = appId;
    this.sentryDsn = sentryDsn;
    this.mountPoint = mountPoint;
  }

  getAppId() {
    return this.appId;
  }

  getSentryDsn() {
    return this.sentryDsn;
  }

  getMountPoint() {
    return this.mountPoint;
  }

  isSentryEnabled() {
    return Boolean(this.sentryDsn);
  }
}

module.exports = IdentityXConfiguration;
