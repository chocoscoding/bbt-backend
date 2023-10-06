import * as Service from "../../services/Manager";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// export const createNewStyle = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { data, error, statusCode, message } = await Service.createStyle(req.body);
//     res.status(statusCode);
//     res.json({ data, error, message });
//     return;
//   } catch (error: any) {
//     next(error);
//   }
// };

export const changeTheme = async (req: Request, res: Response, next: NextFunction) => {};

export const changeInfo = async (req: Request, res: Response, next: NextFunction) => {};
