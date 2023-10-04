import * as CategoryService from "../services/Category";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const createNewCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await CategoryService.createCategory(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};
export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await CategoryService.getCategories();
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};
export const getCategoryByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await CategoryService.getOneCategory(req.params as { name: string });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};
export const editOneCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bodyData = { name: req.body.name, coverImage: req.body.coverImage };
    const id = req.params.id;
    const { data, error, statusCode, message } = await CategoryService.editOneCategory({ data: bodyData, id });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};
export const deleteOneCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await CategoryService.deleteOneCategory({ id: req.params.id });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};
