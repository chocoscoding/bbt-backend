import { Router } from "express";
import * as Controller from "../../controllers/Manager/CategoryController";
import { protectedRoute, isManager } from "../../middleware/ProtectedRoute";
import { body, param } from "express-validator";
import { handleInputError } from "../../middleware/ErrorHandler";

const router = Router();

router.get("/", Controller.getAllCategories);
router.get("/:name", param("name").exists().isString(), handleInputError, Controller.getCategoryByName);

export default router;
