import * as Service from "../services/Style";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const createNewCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await Service.createStyle(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const getAllStyles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = ~~(req.query.page as string);
    const { data, error, statusCode, message } = await Service.getAllStyles({ page: page || 1 });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const getStyleByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await Service.getOneStyle(req.params as { name: string });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const editOneStyleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await Service.editOneStyle(req.body);
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const deleteOneStyleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error, statusCode, message } = await Service.deleteOneStyle({ id: req.params.id });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const deleteMultipleStylesById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ids = req.body.ids as string[];
    const { data, error, statusCode, message } = await Service.deleteMultipleStyles({ ids });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};

export const searchStylesByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchQuery = req.query.query as string;
    const { data, error, statusCode, message } = await Service.searchStyle({ searchQuery });
    res.status(statusCode);
    res.json({ data, error, message });
    return;
  } catch (error: any) {
    next(error);
  }
};
