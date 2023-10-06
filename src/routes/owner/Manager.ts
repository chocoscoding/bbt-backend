import { Router } from "express";
import * as Controller from "../../controllers/Owner/OwnerController";
const router = Router();

// get all managers
router.get("/managers", Controller.getAllManagers);

// get one manager
router.get("/managers/:id", Controller.getOneManager);

// get one manager
router.put("/managers/:id/edit", Controller.changeManagerInfo);

// Delete manager
router.delete("/managers/:id", Controller.deleteManager);

export default router;
