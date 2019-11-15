export default class FormError extends Error {
  constructor(message, code = 500) {
    super(message);
    this.name = 'FormError';
    this.code = code;
  }
}
