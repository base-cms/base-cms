export default class AuthenticationError extends Error {
  constructor(message, code = 500) {
    super(message);
    this.name = 'AuthenticationError';
    this.code = code;
  }
}
