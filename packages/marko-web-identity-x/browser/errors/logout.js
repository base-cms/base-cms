export default class LogoutError extends Error {
  constructor(message, code = 500) {
    super(message);
    this.name = 'LogoutError';
    this.code = code;
  }
}
