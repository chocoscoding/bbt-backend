import { Router } from "express";
import * as Controller from "../controllers/StyleController";
import { handleInputError } from "../middleware/ErrorHandler";
import { body, param } from "express-validator";
import { fieldRequirements, protectedRoute, protectedRouteForManagers } from "../middleware/ProtectedRoute";
const router = Router();

router.get("/", Controller.getAllStyles);
router.get("/:name", param("name").isString(), handleInputError, Controller.getStyleByName);
router.get("/search", Controller.searchStylesByName);
router.post(
  "/create",
  protectedRoute,
  protectedRouteForManagers,
  body("name").exists().isString().notEmpty(),
  body("description").exists().isString().notEmpty(),
  body("coverPicture").exists().isString().notEmpty(),
  body("stylePictures").exists().isArray({ min: 1 }),
  body("averageTime").exists().isNumeric(),
  body("categoryName").exists().isString().notEmpty(),
  body("note").optional().isString(),
  handleInputError,
  Controller.createNewStyle
);
router.put(
  "/edit/:id",
  protectedRoute,
  protectedRouteForManagers,
  fieldRequirements(["name", "description", "stylePictures", "averageTime", "categoryName", "note", "coverPicture"]),
  body("name").optional().isString().notEmpty(),
  body("description").optional().isString().notEmpty(),
  body("coverPicture").optional().isString().notEmpty(),
  body("stylePictures").optional().isArray({ min: 1 }),
  body("averageTime").optional().isNumeric().notEmpty(),
  body("categoryName").optional().isString().notEmpty(),
  body("note").optional().isString().notEmpty(),
  handleInputError,
  Controller.editOneStyleById
);
router.delete("/delete/:id", protectedRoute, protectedRouteForManagers, handleInputError, Controller.deleteOneStyleById);
router.delete(
  "/delete",
  protectedRoute,
  protectedRouteForManagers,
  body("ids").exists().isArray({ min: 1 }),
  handleInputError,
  Controller.deleteMultipleStylesById
);

export default router;
