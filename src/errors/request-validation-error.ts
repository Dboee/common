import { ValidationError } from 'express-validator';
// ValidationError:
// When we start to build the subclass, at some point in time we are going
// to have to recieve a list of validation errors (the actual reasons the request failed)
// ValidationError lets us describe the requirements for the errors that are going to be
// assigned to our subclass.
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  // keyword private: because we want to take this:
  // errors: ValidationError[]
  // property, and assign it as a property to the overall class.
  // Equivalent to writing:
  // errors: ValidationError[]
  // this.errors = errors;
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // we are extending Error, which is a built in languageclass.
    // Only because we are extending a built in class:
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}

// example usage:
// throw new RequestValidationError(errors);
