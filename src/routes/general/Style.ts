import { Router } from "express";
import * as Controller from "../../controllers/General/StyleController";
import { handleInputError } from "../../middleware/ErrorHandler";
import { param } from "express-validator";

const router = Router();

router.get("/", Controller.getAllStyles);
router.get("/:name", param("name").isString(), handleInputError, Controller.getStyleByName);
router.get("/search", Controller.searchStylesByName);

export default router;
