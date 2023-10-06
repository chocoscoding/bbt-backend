import { Router } from "express";
import * as Controller from "../controllers/AuthController";
import { handleInputError } from "../middleware/ErrorHandler";
import { loginMiddleware, resetPasswordMiddleware, signupMiddleware } from "../middleware/InputMiddlewareChaining";
import { protectedRoute, isManager } from "../middleware/ProtectedRoute";

const router = Router();

router.post("/user/signup", signupMiddleware, Controller.userSignup);
router.post("/user/login", loginMiddleware, Controller.userLogin);
router.post("/user/resetpassword", protectedRoute, resetPasswordMiddleware, Controller.userResetpassword);
router.post("/manager/signup", Controller.managerSignup);
router.post("/manager/login", loginMiddleware, Controller.managerLogin);
router.post("/manager/resetpassword", protectedRoute, isManager, resetPasswordMiddleware, Controller.userResetpassword);

router.use(handleInputError);
export default router;
