import { Router } from "express";
import { protectedRoute } from "../middleware/ProtectedRoute";

const router = Router();

// get user info
router.get("/info", protectedRoute, () => {});

// Edit user info
router.put("/edit", protectedRoute, () => {});

// update user billing info
router.put("/billinginfo", protectedRoute, () => {});

// Change default theme
router.put("/theme", protectedRoute, () => {});

// Delete account
router.delete("/delete", protectedRoute, () => {});

export default router;
