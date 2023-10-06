import { body, validationResult } from "express-validator";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler = (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {};

export const handleInputError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.mapped() });
  } else {
    next();
  }
};
