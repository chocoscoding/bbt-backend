import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import * as Service from "../../services/Auth";

export const userSignup = async (req: Request, res: any, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await Service.createUser(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, message, statusCode } = await Service.loginUser(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const userResetpassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const { data, error, statusCode, message } = await Service.resetPasswordUser({
      id: req.user!.id,
      newPassword,
      oldPassword,
    });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const managerSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.creationPassword !== process.env.CREATION_PASSWORD) {
      res.status(403);
      res.json({ data: null, error: "Not authorized to be a manager", message: null });
      return;
    }
    const { data, error, statusCode, message } = await Service.createManager({ ...req.body, accountType: "ADMIN" });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const managerLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, message, statusCode } = await Service.loginManager(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const ManagerResetpassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const { data, error, statusCode, message } = await Service.resetPasswordUser({
      id: req.user?.id,
      newPassword,
      oldPassword,
    });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};
