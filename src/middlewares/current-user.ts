import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

interface UserPayLoad {
  id: string;
  email: string;
}

// Adds currentUser an optional variable of the Request element. globally.
declare global {
  // Inside the express "project"
  namespace Express {
    // Find the interface for Request
    interface Request {
      // And add an additional optional property to it
      currentUser?: UserPayLoad;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Checks if there is a current user JSON web token.
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayLoad;

    req.currentUser = payload;
  } catch (err) {}
  next();
};
