import * as Service from "../../services/Manager";
import { NextFunction, Request, Response } from "express";

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {};

export const getAllAppointments = async (req: Request, res: Response, next: NextFunction) => {};

export const getAllAppointmentsByStatus = async (req: Request, res: Response, next: NextFunction) => {};

export const getOneAppointment = async (req: Request, res: Response, next: NextFunction) => {};

export const getAllAppointmentsForUser = async (req: Request, res: Response, next: NextFunction) => {};

export const cancleAppointment = async (req: Request, res: Response, next: NextFunction) => {};

export const updateAppointmentStatus = async (req: Request, res: Response, next: NextFunction) => {};

export const updateAppointmentTime = async (req: Request, res: Response, next: NextFunction) => {};

export const unsuspendUser = async (req: Request, res: Response, next: NextFunction) => {};

export const initiateRefund = async (req: Request, res: Response, next: NextFunction) => {};

export const createOrAddAppointmentRating = async (req: Request, res: Response, next: NextFunction) => {};
