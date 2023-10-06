import { Router } from "express";
import * as Controller from "../../controllers/Manager/CategoryController";
import { protectedRoute, isManager } from "../../middleware/ProtectedRoute";
import { body, param } from "express-validator";
import { handleInputError } from "../../middleware/ErrorHandler";

const router = Router();

router.post(
  "/create",
  body("name").exists().isString(),
  body("coverImage").exists().isString(),
  handleInputError,
  Controller.createNewCategory
);
router.put(
  "/:id",
  param("id").exists().isString(),
  body("name").optional().isString(),
  body("coverImage").optional().isString(),
  handleInputError,
  Controller.editOneCategoryById
);
router.delete("/:id", param("id").exists().isString(), handleInputError, Controller.deleteOneCategoryById);

export default router;
