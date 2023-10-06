import { Router } from "express";
import * as Controller from "../../controllers/Manager/ManagerController";

const router = Router();

// Edit manager info
router.put("/edit", Controller.changeInfo);

// Edit manager theme
router.put("/edit/theme", Controller.changeTheme);

// Get all users
router.get("/users", () => {});

// Ban a user
router.put("/users/:id/ban", () => {});

// Ban multiple users
router.put("/users/ban", () => {});

// Unban a user
router.put("/users/:id/unban", () => {});

// Unban multiple users
router.put("/users/unban", () => {});

export default router;
