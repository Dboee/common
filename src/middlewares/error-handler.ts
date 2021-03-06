import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // CUSTOM ERROR
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // DEFAULT BEHAVIOUR
  console.error(err);
  res.status(400).send({
    errors: [
      {
        message: '400 default error: ' + err.message,
      },
    ],
  });
};
