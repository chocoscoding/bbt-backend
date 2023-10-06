import { Router } from "express";
import * as Controller from "../controllers/CategoryController";
import { protectedRoute, isManager } from "../middleware/ProtectedRoute";
import { body, param } from "express-validator";
import { handleInputError } from "../middleware/ErrorHandler";

const router = Router();

router.get("/", Controller.getAllCategories);
router.get("/:name", param("name").exists().isString(), handleInputError, Controller.getCategoryByName);
router.post(
  "/create",
  protectedRoute,
  isManager,
  body("name").exists().isString(),
  body("coverImage").exists().isString(),
  handleInputError,
  Controller.createNewCategory
);
router.put(
  "/:id",
  protectedRoute,
  isManager,
  param("id").exists().isString(),
  body("name").optional().isString(),
  body("coverImage").optional().isString(),
  handleInputError,
  Controller.editOneCategoryById
);
router.delete("/:id", protectedRoute, isManager, param("id").exists().isString(), handleInputError, Controller.deleteOneCategoryById);

export default router;
