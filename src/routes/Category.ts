import { Router } from "express";
import {
  createNewCategory,
  deleteOneCategoryById,
  editOneCategoryById,
  getAllCategories,
  getCategoryByName,
} from "../controllers/CategoryController";
import { protectedRoute, protectedRouteForManagers } from "../middleware/ProtectedRoute";
import { body, param } from "express-validator";
import { handleInputError } from "../middleware/ErrorHandler";

const router = Router();

router.get("/", getAllCategories);
router.get("/:name", param("name").exists().isString(), handleInputError, getCategoryByName);
router.post(
  "/create",
  protectedRoute,
  protectedRouteForManagers,
  body("name").exists().isString(),
  body("coverImage").exists().isString(),
  handleInputError,
  createNewCategory
);
router.put(
  "/:id",
  protectedRoute,
  protectedRouteForManagers,
  param("id").exists().isString(),
  body("name").optional().isString(),
  body("coverImage").optional().isString(),
  handleInputError,
  editOneCategoryById
);
router.delete("/:id", protectedRoute, protectedRouteForManagers, param("id").exists().isString(), handleInputError, deleteOneCategoryById);

export default router;
