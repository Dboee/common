import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super('Route not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [
      {
        message:
          'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.',
      },
    ];
  }
}
