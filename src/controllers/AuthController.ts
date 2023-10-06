import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { createUser, loginUser, resetPassword } from "../services/Auth";

export const userSignup = async (req: Request, res: any, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await createUser(req.body);
    return res.status(statusCode).json({ data, error, message });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, message, statusCode } = await loginUser(req.body);
    return res.status(statusCode).json({ data, error, message });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

export const userResetpassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const { data, error, statusCode, message } = await resetPassword({
      id: req.user.id,
      newPassword,
      oldPassword,
    });
    return res.status(statusCode).json({ data, error, message });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

export const managerSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.creationPassword !== process.env.CREATION_PASSWORD)
      return res.status(403).json({ data: null, error: "Not authorized", message: null });
    const { data, error, statusCode, message } = await createUser(req.body);
    return res.status(statusCode).json({ data, error, message });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

export const managerLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, message, statusCode } = await loginUser(req.body);
    return res.status(statusCode).json({ data, error, message });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

export const ManagerResetpassword = async (req: Request, res: Response, next: NextFunction) => {};
