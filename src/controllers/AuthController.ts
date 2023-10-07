import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { createManager, createUser, loginManager, loginUser, resetPasswordUser } from "../services/Auth";

export const userSignup = async (req: Request, res: any, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await createUser(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
    return;
  }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, message, statusCode } = await loginUser(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
    return;
  }
};

export const userResetpassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const { data, error, statusCode, message } = await resetPasswordUser({
      id: req.user!.id,
      newPassword,
      oldPassword,
    });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
    return;
  }
};

export const managerSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.creationPassword !== process.env.CREATION_PASSWORD) {
      res.status(403);
      res.json({ data: null, error: "Not authorized to be a manager", message: null });
      return;
    }
    const { data, error, statusCode, message } = await createManager({ ...req.body, accountType: "ADMIN" });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
    return;
  }
};

export const managerLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, message, statusCode } = await loginManager(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
    return;
  }
};

export const ManagerResetpassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const { data, error, statusCode, message } = await resetPasswordUser({
      id: req.manager?.id,
      newPassword,
      oldPassword,
    });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
    return;
  }
};
