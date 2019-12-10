export default class FeatureError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.name = 'FeatureError';
    this.code = code;
  }
}
