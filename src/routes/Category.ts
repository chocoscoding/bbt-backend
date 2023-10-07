import { Router } from "express";
import { createNewCategory } from "../controllers/CategoryController";

const router = Router();

router.get("/", createNewCategory);
router.get("/:name", (req, res) => {});
router.post("/create", (req, res) => {});
router.put("/edit/:id", (req, res) => {});
router.delete("/delete/:id", (req, res) => {});

export default router;
