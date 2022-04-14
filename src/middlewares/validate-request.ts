import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ValidationResult is a function coming for the express-validator library.
  const errors = validationResult(req);
  // If there are any errors, throw requestvalidation error.
  if (!errors.isEmpty()) {
    // Requestvalidationerror is a custom error handler we made earlier.
    throw new RequestValidationError(errors.array());
  }
  // If there is no error, move on
  next();
};
