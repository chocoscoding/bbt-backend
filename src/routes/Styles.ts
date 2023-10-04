import { Router } from "express";
import * as Controller from "../controllers/StyleController";
const router = Router();

router.get("/", Controller.getAllStyles);
router.get("/:id", Controller.getStyleByName);
router.get("/search", Controller.searchStylesByName);
router.post("/create", Controller.createNewCategory);
router.get("/edit/:id", Controller.editOneStyleById);
router.delete("/delete", Controller.deleteOneStyleById);
router.delete("/delete/:id", Controller.deleteMultipleStylesById);
