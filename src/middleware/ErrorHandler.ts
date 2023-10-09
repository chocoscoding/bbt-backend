import { body, validationResult } from "express-validator";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import customLogger from "../logs/Customlog";

export const errorHandler = (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ data: null, error: "oops, that's on us", message: "oops, that's on us" });
};

export const handleInputError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.mapped() });
  } else {
    next();
  }
};
