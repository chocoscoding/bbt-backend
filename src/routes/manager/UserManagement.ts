import { Router } from "express";
import * as Controller from "../../controllers/Manager/ManagerController";

const router = Router();

// Get all users
router.get("/users", () => {});

// Get one user
router.get("/users/:id", () => {});

// Ban a user
router.put("/users/:id/ban", () => {});

// Ban multiple users
router.put("/users/ban", () => {});

// Unban a user
router.put("/users/:id/unban", () => {});

// Unban multiple users
router.put("/users/unban", () => {});

export default router;
