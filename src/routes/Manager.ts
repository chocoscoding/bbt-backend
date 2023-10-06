import { Router } from "express";
import { isManager, isOwner, protectedRoute } from "../middleware/ProtectedRoute";

const router = Router();

// Edit manager info
router.put("/edit", protectedRoute, isManager, () => {});

// Change manager status
router.put("/manager/:id/status", protectedRoute, isOwner, () => {});

// Delete manager
router.delete("/manager/:id", protectedRoute, isOwner, () => {});

// Get all users
router.get("/users", protectedRoute, isManager, () => {});

// Ban a user
router.put("/users/:id/ban", protectedRoute, isManager, () => {});

// Ban multiple users
router.put("/users/ban", protectedRoute, isManager, () => {});

// Unban a user
router.put("/users/:id/unban", protectedRoute, isManager, () => {});

// Unban multiple users
router.put("/users/unban", protectedRoute, isManager, () => {});

// Suspend manager
router.put("/manager/:id/suspend", protectedRoute, isOwner, () => {});

export default router;