import * as Service from "../../services/Manager";
import { NextFunction, Request, Response } from "express";

//for owner
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {};
export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {};
export const getOneUserAppointments = async (req: Request, res: Response, next: NextFunction) => {};
export const getOneUserRevenueGenerated = async (req: Request, res: Response, next: NextFunction) => {};
export const suspendUser = async (req: Request, res: Response, next: NextFunction) => {};
export const unsuspendUser = async (req: Request, res: Response, next: NextFunction) => {};
