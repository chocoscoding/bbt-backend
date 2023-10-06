import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_UserType } from "../services/@types/Auth";
export const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({
      data: null,
      error: "Not authorized",
    });
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    return res.status(401).json({
      data: null,
      error: "Not authorized",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as JWT_UserType;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      data: null,
      error: "Not authorized",
    });
  }
};
export const protectedRouteForManager = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({
      data: null,
      error: "Not authorized",
    });
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    return res.status(401).json({
      data: null,
      error: "Not authorized",
    });
  }

  try {
    const manager = jwt.verify(token, process.env.JWT_SECRET as string) as JWT_UserType;
    if (manager.accountType === "OWNER" || manager.accountType === "ADMIN") {
      req.manager = manager;
      next();
    }
    return res.status(401).json({
      data: null,
      message: null,
      error: "Not a manager",
    });
  } catch (error) {
    return res.status(401).json({
      data: null,
      message: null,
      error: "Not authorized",
    });
  }
};
