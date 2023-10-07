import { createCategory, getCategories, getOneCategory } from "../services/Category";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
export const createNewCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new Error("test");
    const { data, error, statusCode, message } = await createCategory(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
  } catch (error: any) {
    error.location = "createNewCategory";
    next(error);
}
};
export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const { data, error, statusCode, message } = await getCategories();
  } catch (error: any) {
    error.location = "getAllCategories";
    next(error);
  }
};
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { data, error, statusCode, message } = await getOneCategory(req.body);
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
    return;
  }
};
export const putOneCategory = (req: Request, res: Response) => {};
export const deleteOneCategory = (req: Request, res: Response) => {};
